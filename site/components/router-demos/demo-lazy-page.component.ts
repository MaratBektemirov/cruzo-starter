import { AbstractComponent, componentsRegistryService, routerService } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";
import { routerUrlBucket } from "site/urls";

export class DemoLazyPageComponent extends AbstractComponent {
  static selector = "demo-lazy-page-component";

  getHTML() {
    return `<div class="description-note">
        <h3 class="mb_s">Lazy route loaded</h3>
        <p class="description-paragraph">
          Этот компонент попал в бандл только после <code class="description-inline-code">loadResources</code>.
        </p>
        <button type="button" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mt_m"
          onclick="{{ root.goHome() }}">
          На главную
        </button>
      </div>`;
  }

  goHome() {
    routerService.pushHistory(routerUrlBucket.buildUrl("main"));
  }
}

componentsRegistryService.define(DemoLazyPageComponent);
