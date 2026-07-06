import { AbstractComponent, componentsRegistryService } from "cruzo"
import { getTranslater } from 'site/utils/get-translater'
import i18n from './error.component.i18n.json'

export class ErrorComponent extends AbstractComponent {
  static selector = "error-component";

  t$ = getTranslater(i18n, this)

  constructor() {
    super();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  getHTML() {
    return `<div class="container_content__article">
        <h2 class="title_with-content">
          {{ root.t$::rx?.smthWrong }}
          <close-filled-icon icon-color="#ff2f2f" class="title-icon"></close-filled-icon>
        </h2>
        <div>
          {{ root.t$::rx?.userOpinion }}
        </div>
      </div>`;
  }

  connectedCallback() {
    console.log(this.node);
  }
}

componentsRegistryService.define(ErrorComponent);