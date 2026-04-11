import { AbstractComponent, componentsRegistryService } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoTargetedUpdatesComponent extends AbstractComponent {
  static selector = "demo-targeted-updates-component";

  first$ = this.newRx(0);
  second$ = this.newRx(0);

  getHTML() {
    return `<div>
        <div class="mt_s fx">
          <button
            onclick="{{ root.first$.update(root.first$::rx + 1) }}"
            class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary mr_s">
            Первое: {{ root.first$::rx }}
          </button>
          <button
            onclick="{{ root.second$.update(root.second$::rx + 1) }}"
            class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary">
            Второе: {{ root.second$::rx }}
          </button>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoTargetedUpdatesComponent);
