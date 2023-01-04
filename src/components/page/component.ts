export interface Component {
    attachTo(parent: HTMLElement, position?: InsertPosition): void;
    removeFrom(parent: HTMLElement): void;
}

/**
 * Encapsulation the HTML element creation
 */
export class BaseComponent<T extends Element> implements Component {
    protected readonly element: T;
    constructor(htmlString: string) {
        const template = document.createElement('template');
        template.innerHTML = htmlString;
        this.element = template.content.firstChild! as T;
    }

    attachTo(parent: HTMLElement , position: InsertPosition = 'afterbegin'): void {
        parent.insertAdjacentElement(position, this.element);
    }

    removeFrom(parent: HTMLElement) {
        if (parent !== this.element.parentElement) {
            throw new Error('Parent Mismatched!')
        }

        parent.removeChild(this.element);
    }
}