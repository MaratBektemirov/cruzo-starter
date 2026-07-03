import { AbstractComponent, componentsRegistryService, routerService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from "site/services/lang.service"
import { routerUrlBucket } from "site/urls"
import i18n from "./demo-router-lazy.component.i18n.json"

export class DemoRouterLazyComponent extends AbstractComponent {
  static selector = "demo-router-lazy-component";

  i18n = i18n;
  loading$ = routerService.resourcesLoading$;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  getHTML() {
    return `<div>
        <p class="description-paragraph mb_s">
          {{ root.t$::rx.route }}
          <code class="description-inline-code">/lazy-demo</code>
          {{ root.t$::rx.loadsChunkVia }}
          <code class="description-inline-code">{{ root.t$::rx.loadResources }}</code>
        </p>

        <button
          type="button"
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s"
          onclick="{{ root.openLazy() }}"
        >
          {{ root.t$::rx.goToLazyDemo }}
        </button>

        <div class="mt_s">
          {{ root.t$::rx.resourcesLoading }}: <b>{{ root.loading$::rx }}</b>
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