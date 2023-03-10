import { Component, BaseComponent } from './component.js';

export interface Composable {
    addChild(child: Component): void;
}

type DragState = 'start' | 'end' | 'enter' | 'leave';
type OnCloseListener = () => void;
type OnDragStateListener<T extends Component> = (target: T, state: DragState) => void;

type SectionContainerConstructor = {
    new (): SectionContainer;
};
interface SectionContainer extends Component, Composable {
    setOnCloseListener(listener: OnCloseListener): void;
    setOnDragStateListener(listener: OnDragStateListener<SectionContainer>): void;
    muteChildren(state: 'mute' | 'unmute'): void;
    getBoundingRect(): DOMRect;
    onDropped(): void;
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer {
    private closeListener?: OnCloseListener;
    private dragStateListener?: OnDragStateListener<PageItemComponent>;

    constructor() {
        super(`<li draggable="true" class="page-item">
                    <section class="page-item__body"></section>
                    <div class="page-item__controls">
                        <button class="close" onclick="() => this.closeChild">&times;</button>
                    </div>
                </li>`);
        const closeButton = this.element.querySelector('.close');
        closeButton?.addEventListener('click', () => {
            this.closeListener && this.closeListener();
        });

        this.element.addEventListener('dragstart', (event: DragEvent) => {
            this.onDragStart(event);
        });
        this.element.addEventListener('dragend', (event: DragEvent) => {
            this.onDragEnd(event);
        });

        this.element.addEventListener('dragenter', (event: DragEvent) => {
            this.onDragEnter(event);
        });
        this.element.addEventListener('dragleave', (event: DragEvent) => {
            this.onDragLeave(event);
        });
    }

    onDragStart(_: DragEvent) {
        this.notifyingDragObservers('start');
        this.element.classList.add('lifted');
    }
    onDragEnd(_: DragEvent) {
        this.notifyingDragObservers('end');
        this.element.classList.remove('lifted');
    }

    onDragEnter(_: DragEvent) {
        this.notifyingDragObservers('enter');
        this.element.classList.add('drop-area');
    }

    onDragLeave(_: DragEvent) {
        this.notifyingDragObservers('leave');
        this.element.classList.remove('drop-area');
    }

    onDropped() {
        this.element.classList.remove('drop-area');
    }
    notifyingDragObservers(state: DragState) {
        this.dragStateListener && this.dragStateListener(this, state);
    }
    addChild(child: Component) {
        const container = this.element.querySelector('.page-item__body')! as HTMLElement;
        child.attachTo(container);
    }

    setOnCloseListener(listener: OnCloseListener) {
        this.closeListener = listener;
    }

    setOnDragStateListener(listener: OnDragStateListener<PageItemComponent>) {
        this.dragStateListener = listener;
    }

    muteChildren(state: 'mute' | 'unmute'): void {
        if (state === 'mute') {
            this.element.classList.add('mute-children');
        } else {
            this.element.classList.remove('mute-children');
        }
    }

    getBoundingRect(): DOMRect {
        return this.element.getBoundingClientRect();
    }
}

export class PageComponent extends BaseComponent<HTMLElement> implements Composable {
    private children = new Set<SectionContainer>();
    private dropTarget?: SectionContainer;
    private dragTarget?: SectionContainer;
    constructor(private pageItemConstructor: SectionContainerConstructor) {
        super('<ul class="page"></ul>');

        this.element.addEventListener('dragover', (event: DragEvent) => {
            this.onDragOver(event);
        });
        this.element.addEventListener('drop', (event: DragEvent) => {
            this.onDrop(event);
        });
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        // console.log('dragover', event)
    }
    onDrop(event: DragEvent) {
        event.preventDefault();
        // console.log('drop', event)

        if (!this.dropTarget) {
            return;
        }

        if (this.dragTarget && this.dropTarget !== this.dragTarget) {
            const dropY = event.clientY;
            const srcElement = this.dragTarget.getBoundingRect();

            this.dragTarget.removeFrom(this.element);
            this.dropTarget.attach(this.dragTarget, dropY < srcElement.y ? 'beforebegin' : 'afterend');
        }

        this.dropTarget.onDropped();
    }

    addChild(section: Component) {
        const item = new this.pageItemConstructor();
        item.addChild(section);
        item.attachTo(this.element, 'beforeend');
        item.setOnCloseListener(() => {
            item.removeFrom(this.element);
            this.children.delete(item);
        });
        this.children.add(item);
        item.setOnDragStateListener((target: SectionContainer, state: DragState) => {
            switch (state) {
                case 'start':
                    this.dragTarget = target;
                    this.updateSections('mute');
                    break;
                case 'end':
                    this.dragTarget = undefined;
                    this.updateSections('unmute');
                    break;
                case 'enter':
                    this.dropTarget = target;
                    break;
                case 'leave':
                    this.dropTarget = undefined;
                    break;
                default:
                    throw new Error(`unsupported state: ${state}`);
            }
            console.log(target, state);
        });
    }
    private updateSections(state: 'mute' | 'unmute') {
        this.children.forEach((section: SectionContainer) => {
            section.muteChildren(state);
        });
    }
}
