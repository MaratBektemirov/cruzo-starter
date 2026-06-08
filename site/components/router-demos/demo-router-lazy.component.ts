import { AbstractComponent, componentsRegistryService, routerService } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";
import { routerUrlBucket } from "site/urls";

export class DemoRouterLazyComponent extends AbstractComponent {
  static selector = "demo-router-lazy-component";

  loading$ = routerService.resourcesLoading$;

  getHTML() {
    return `<div>
        <p class="description-paragraph mb_s">
          Маршрут <code class="description-inline-code">/lazy-demo</code> грузит chunk через
          <code class="description-inline-code">loadResources</code>
        </p>
        <button type="button"
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s"
          onclick="{{ root.openLazy() }}">
          Перейти на /lazy-demo
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
