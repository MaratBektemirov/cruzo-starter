import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { getTranslater } from 'site/utils/get-translater'
import i18n from './demo-targeted-updates.component.i18n.json'

export class DemoTargetedUpdatesComponent extends AbstractComponent {
  static selector = "demo-targeted-updates-component";

  t$ = getTranslater(i18n, this)

  first$ = this.newRx(0);
  second$ = this.newRx(0);

  getHTML() {
    return `<div>
        <div class="mt_s fx">
          <button
            onclick="{{ root.first$.update(root.first$::rx + 1) }}"
            class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary mr_s">
            {{ root.t$::rx?.first }}: {{ root.first$::rx }}
          </button>
          <button
            onclick="{{ root.second$.update(root.second$::rx + 1) }}"
            class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary">
            {{ root.t$::rx?.second }}: {{ root.second$::rx }}
          </button>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoTargetedUpdatesComponent);
