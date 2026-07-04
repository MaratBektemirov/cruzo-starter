import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { getTranslater } from 'site/utils/get-translater'
import i18n from './demo-native-html.component.i18n.json'

export class DemoNativeHtmlComponent extends AbstractComponent {
  static selector = "demo-native-html-component";

  t$ = getTranslater(i18n, this)

  count = this.newRx(0);

  getHTML() {
    return `<div>
        <h3>{{ root.t$::rx?.title }}</h3>
        <button
          onclick="{{ root.count.update(root.count::rx + 1) }}"
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mt_xs">
          {{ root.t$::rx?.clicks }}: {{ root.count::rx }}
        </button>
      </div>`;
  }
}

componentsRegistryService.define(DemoNativeHtmlComponent);
