import { AbstractComponent, ComponentConnectedParams, componentsRegistryService, routerService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { SectionIds } from "site/sections"
import { appService } from "site/services/app.service"
import { langService } from "site/services/lang.service"
import { routerUrlBucket } from "site/urls"
import i18n from "./demo-lazy-page.component.i18n.json"

export class DemoLazyPageComponent extends AbstractComponent {
  static selector = "demo-lazy-page-component";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  getHTML() {
    return `<div class="description-note">
        <h3 class="mb_s">{{ root.t$::rx.title }}</h3>

        <p class="description-paragraph">
          {{ root.t$::rx.description }}
          <code class="description-inline-code">loadResources</code>.
        </p>

        <button
          type="button"
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mt_m"
          onclick="{{ root.goHome() }}"
        >
          {{ root.t$::rx.goHome }}
        </button>
      </div>`;
  }

  goHome() {
    routerService.pushHistory(routerUrlBucket.buildUrl("main"));
  }

  connectedCallback(params?: ComponentConnectedParams): void {
    appService.currentSectionId$.update(SectionIds["demo-lazy-page"]);
    super.connectedCallback(params);
  }
}

componentsRegistryService.define(DemoLazyPageComponent);