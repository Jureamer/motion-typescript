export class ImageComponent {
    private element: HTMLUListElement;

    constructor () {
        this.element = document.createElement('ul');
        this.element.setAttribute('class', 'page');
        this.element.textContent = 'This is PageComponent'
        
    }
    
    attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin'): void {
        parent.insertAdjacentElement(position, this.element);
    }
}