{
    interface BlockMaker {
        block: Block;
        addVideo(video: Video): void;
        addPicture(picture: Picture): void;
        addNote(note: Note): void;
        addTodo(todo: Todo): void;
        deleteOne<T>(): void;
    }

    type Block = any[];
    
    type Video = {
        title: string;
        url: string;
    }

    type Picture = Video

    type Note = {
        title: string;
        body: string;
    }

    type Todo = Note

    class BlockMakerImpl implements BlockMaker {
        block: Block = []
        constructor() {
        }

        addVideo(video: Video) {
            document.querySelector
            this.block.push(video);
        }   
        addPicture(picture: Picture) {
            this.block.push(picture);
        }
        addNote(note: Note) {
            this.block.push(note);
        }
        addTodo(todo: Todo) {
            this.block.push(todo);
        }
        deleteOne<T>() {
        }
    }

    const blockMaker = new BlockMakerImpl();
}
