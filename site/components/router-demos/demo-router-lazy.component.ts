import { AbstractComponent, componentsRegistryService, routerService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from "site/services/lang.service"
import { routerUrlBucket } from "site/urls"

export class DemoRouterLazyComponent extends AbstractComponent {
  static selector = "demo-router-lazy-component";

  loading$ = routerService.resourcesLoading$;
  lang$ = this.newRxFunc(
    () => langService.lang$.actual,
    langService.lang$
  );

  getHTML() {
    return `<div>
        <p class="description-paragraph mb_s">
          {{ root.lang$::rx === "ru"
            ? "Маршрут"
            : "Route" }}
          <code class="description-inline-code">/lazy-demo</code>
          {{ root.lang$::rx === "ru"
            ? "грузит chunk через"
            : "loads a chunk via" }}
          <code class="description-inline-code">loadResources</code>
        </p>
        <button type="button"
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s"
          onclick="{{ root.openLazy() }}">
          {{ root.lang$::rx === "ru" ? "Перейти на /lazy-demo" : "Go to /lazy-demo" }}
        </button>
        <div class="mt_s">
          resourcesLoading$: <b>{{ root.loading$::rx }}</b>
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