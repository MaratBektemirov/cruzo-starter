import { AbstractComponent, componentsRegistryService } from "cruzo";

export class ErrorComponent extends AbstractComponent {
  static selector = "error-component";

  constructor() {
    super();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  getHTML() {
    return `<div class="container_content__article">
        <h2 class="title_with-content">
          Что-то пошло не так
          <close-filled-icon icon-color="#ff2f2f" class="title-icon"></close-filled-icon>
        </h2>
        <div>
          Если вы думаете что это случилось по нашей вине, напишите нам
        </div>
      </div>`;
  }

  connectedCallback() {
    console.log(this.node);
  }
}

componentsRegistryService.define(ErrorComponent);