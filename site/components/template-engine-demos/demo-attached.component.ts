import { AbstractComponent, componentsRegistryService } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoAttachedComponent extends AbstractComponent {
  static selector = "demo-attached-component";

  open = this.newRx(true);

  protected getHTML(): string {
    return `<div>
        <button class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary" onclick="{{ root.open.update(!root.open::rx) }}">
          Toggle
        </button>

        <div attached="{{ root.open::rx }}" class="description-note">
          Этот блок реально присутствует в DOM только когда <code class="description-inline-code">open === true</code>
        </div>

        <div class="mt_s">
          open: <b>{{ root.open::rx }}</b>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoAttachedComponent);
