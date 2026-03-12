import { AbstractComponent, componentsRegistryService } from "cruzo";
import { appService } from "site/services/app.service";

export class HeaderComponent extends AbstractComponent {
  static selector = "header-component";

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  section$ = appService.section$;

  getHTML() {
    return `<header>
        <div let-section="{{ this.section$::rx }}">
          <h1 class="mt_l">{{ section?.title }}</h1>
          <span class="header__description" inner-html="{{ section?.description }}"></span>
        </div>
      </header>`;
  }

  async connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(HeaderComponent);
