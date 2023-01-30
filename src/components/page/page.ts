import { Component, BaseComponent } from './component.js'

export interface Composable {
    addChild(child: Component): void
}

type OnCloseListener = () => void
export class PageItemComponent extends BaseComponent<HTMLElement> implements Composable {
    private closeListener?: OnCloseListener

    constructor() {
        super(`<li draggable="true" class="page-item">
                    <section class="page-item__body"></section>
                    <div class="page-item__controls">
                        <button class="close" onclick="() => this.closeChild">&times;</button>
                    </div>
                </li>`)
        console.log(this.element)
        const closeButton = this.element.querySelector('.close')
        closeButton?.addEventListener('click', () => {
            this.closeListener && this.closeListener()
        })

        this.element.addEventListener('dragstart', (event: DragEvent) => {
            this.onDragStart(event)
        })
        this.element.addEventListener('dragend', (event: DragEvent) => {
            this.onDragEnd(event)
        })
    }

    onDragStart(event: DragEvent) {
        console.log('dragstart', event)
    }
    onDragEnd(event: DragEvent) {
        console.log('dragend', event)
    }

    addChild(child: Component) {
        const container = this.element.querySelector('.page-item__body')! as HTMLElement
        child.attachTo(container)
    }

    setOnCloseListener(listener: OnCloseListener) {
        this.closeListener = listener
    }
}

export class PageComponent extends BaseComponent<HTMLElement> implements Composable {
    constructor() {
        super('<ul class="page"></ul>')

        this.element.addEventListener('dragover', (event: DragEvent) => {
            this.onDragOver(event)
        })
        this.element.addEventListener('drop', (event: DragEvent) => {
            this.onDrop(event)
        })
    }
    onDragOver(event: DragEvent) {
        event.preventDefault()
        console.log('dragover', event)
    }
    onDrop(event: DragEvent) {
        event.preventDefault()
        console.log('drop', event)
    }

    addChild(section: Component) {
        const item = new PageItemComponent()
        item.addChild(section)
        item.attachTo(this.element, 'beforeend')
        item.setOnCloseListener(() => {
            item.removeFrom(this.element)
        })
    }
}
