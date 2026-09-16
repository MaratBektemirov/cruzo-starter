import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from './demo-targeted-updates.component.i18n.json'

export class DemoTargetedUpdatesComponent extends AbstractComponent {
  static selector = "demo-targeted-updates-component";

  i18n$ = i18nService.connect(this, i18n);

  first$ = this.newRx(0);
  second$ = this.newRx(0);

  getHTML() {
    return `<div>
        <div class="mt_s fx">
          <button
            onclick="{{ root.first$.update(root.first$::rx + 1) }}"
            class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary mr_s">
            {{ root.i18n$::rx.first }}: {{ root.first$::rx }}
          </button>
          <button
            onclick="{{ root.second$.update(root.second$::rx + 1) }}"
            class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary">
            {{ root.i18n$::rx.second }}: {{ root.second$::rx }}
          </button>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoTargetedUpdatesComponent);
