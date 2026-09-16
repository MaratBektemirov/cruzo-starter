import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import i18n from './error.component.i18n.json'

export class ErrorComponent extends AbstractComponent {
  static selector = "error-component";

  i18n$ = i18nService.connect(this, i18n);

  constructor() {
    super();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  getHTML() {
    return `<div class="container_content__article">
        <h2 class="title_with-content">
          {{ root.i18n$::rx.smthWrong }}
          <close-filled-icon icon-color="#ff2f2f" class="title-icon"></close-filled-icon>
        </h2>
        <div>
          {{ root.i18n$::rx.userOpinion }}
        </div>
      </div>`;
  }

  connectedCallback() {
    console.log(this.node);
  }
}

componentsRegistryService.define(ErrorComponent);