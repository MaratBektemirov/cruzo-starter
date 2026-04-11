import { AbstractComponent, componentsRegistryService } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoTemplateRxComponent extends AbstractComponent {
  static selector = "demo-template-rx-component";

  count$ = this.newRx(0);

  getHTML() {
    return `<div class="mt_s">
        <button onclick="{{ root.count$.update(root.count$::rx + 1) }}" class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary">
          Clicks: <b>{{ root.count$::rx }}</b>
        </button>
      </div>`;
  }
}

componentsRegistryService.define(DemoTemplateRxComponent);
