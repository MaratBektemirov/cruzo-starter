import { AbstractComponent, componentsRegistryService } from "cruzo"
import { langService } from 'site/services/lang.service'
import i18n from './error.component.i18n.json'

export class ErrorComponent extends AbstractComponent {
  static selector = "error-component";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  constructor() {
    super();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  getHTML() {
    return `<div class="container_content__article">
        <h2 class="title_with-content">
          {{ root.t$::rx.smthWrong }}
          <close-filled-icon icon-color="#ff2f2f" class="title-icon"></close-filled-icon>
        </h2>
        <div>
          {{ root.t$::rx.userOpinion }}
        </div>
      </div>`;
  }

  connectedCallback() {
    console.log(this.node);
  }
}

componentsRegistryService.define(ErrorComponent);