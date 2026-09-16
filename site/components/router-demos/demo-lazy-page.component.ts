import { AbstractComponent, ComponentConnectedParams, componentsRegistryService, routerService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { SectionIds } from "site/sections"
import { appService } from "site/services/app.service"
import { routerUrlBucket } from "site/urls"
import i18n from "./demo-lazy-page.component.i18n.json"

export class DemoLazyPageComponent extends AbstractComponent {
  static selector = "demo-lazy-page-component";

  i18n$ = i18nService.connect(this, i18n);

  getHTML() {
    return `<div class="description-note">
        <h3 class="mb_s">{{ root.i18n$::rx.title }}</h3>

        <p class="description-paragraph">
          {{ root.i18n$::rx.description }}
          <code class="description-inline-code">loadResources</code>.
        </p>

        <button
          type="button"
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mt_m"
          onclick="{{ root.goHome() }}"
        >
          {{ root.i18n$::rx.goHome }}
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