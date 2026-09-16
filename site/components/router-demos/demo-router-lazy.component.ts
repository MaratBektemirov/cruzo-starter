import { AbstractComponent, componentsRegistryService, routerService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { routerUrlBucket } from "site/urls"
import i18n from "./demo-router-lazy.component.i18n.json"

export class DemoRouterLazyComponent extends AbstractComponent {
  static selector = "demo-router-lazy-component";

  loading$ = routerService.resourcesLoading$;
  i18n$ = i18nService.connect(this, i18n);

  getHTML() {
    return `<div>
        <p class="description-paragraph mb_s">
          {{ root.i18n$::rx.route }}
          <code class="description-inline-code">/lazy-demo</code>
          {{ root.i18n$::rx.loadsChunkVia }}
          <code class="description-inline-code">{{ root.i18n$::rx.loadResources }}</code>
        </p>

        <button
          type="button"
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s"
          onclick="{{ root.openLazy() }}"
        >
          {{ root.i18n$::rx.goToLazyDemo }}
        </button>

        <div class="mt_s">
          {{ root.i18n$::rx.resourcesLoading }}: <b>{{ root.loading$::rx }}</b>
        </div>
      </div>`;
  }

  openLazy() {
    routerService.pushHistory(routerUrlBucket.buildUrl("lazyDemo"));
  }

  openHome() {
    routerService.pushHistory(routerUrlBucket.buildUrl("main"));
  }
}

componentsRegistryService.define(DemoRouterLazyComponent);