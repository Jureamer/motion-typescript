import { BaseComponent } from "../component.js";

export class VideoComponent extends BaseComponent<HTMLElement> {

    constructor (title: string, url: string) {
        super(`<section class="video">
                    <div class="video__player">
                        <iframe class="video__iframe">
                        </iframe>
                    </div>
                    <h3 class="page-item__title video__title"></h3>
                </section>`)
        const iframe = this.element.querySelector('.video__iframe')! as HTMLIFrameElement;
        iframe.src = this.convertToEmbeddedURL(url); 

        const titleElement = this.element.querySelector('.video__title')! as HTMLHeadingElement;
        titleElement.textContent = title;
    }
    
    private convertToEmbeddedURL(url: string): string {
        let videoId: string = url.split("v=")[1]?.split("&")[0]! as string
        let compound = 'https://www.youtube.com/embed/'
        return compound.concat(videoId)
    }
}