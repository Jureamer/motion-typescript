import { BaseComponent } from "../component.js";

export class TodoComponent extends BaseComponent<HTMLElement> {
    constructor(title: string, todo: string) {
        super(`<section class="todo">
                    <h2 class="page-item__title todo__title"></h2>
                    <input type="checkbox" class="todo-checkbox"></input>
                </section>`)

        let titleElement = this.element.querySelector('.todo__title')! as HTMLHeadingElement
        titleElement.textContent = title;
        
        let todoElement = this.element.querySelector('.todo-checkbox')! as HTMLInputElement
        todoElement.insertAdjacentText('afterend', todo)
    }
}