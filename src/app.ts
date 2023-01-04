import { Component } from "./components/page/component.js";
import { ImageComponent } from "./components/page/item/image.js";
import { NoteComponent } from "./components/page/item/note.js";
import { VideoComponent } from "./components/page/item/video.js";
import { Composable, PageComponent } from "./components/page/page.js";


class App {
    private readonly page: Component & Composable;
    constructor(appRoot: HTMLElement) {
        this.page = new PageComponent();
        this.page.attachTo(appRoot);

        const image = new ImageComponent('Image Title', 'https://picsum.photos/600/300');
        this.page.addChild(image);
        
        const note = new NoteComponent('New Note', '새로 작성한 노트');
        this.page.addChild(note);

        const todo = new NoteComponent('New Todo', 'Todo Item');
        this.page.addChild(todo);

        const video = new VideoComponent('Video Title', 'https://www.youtube.com/watch?v=UWcgWLph_os&t=844s');
        this.page.addChild(video);
    }
}

new App(document.querySelector('.document')! as HTMLElement);