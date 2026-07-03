import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from 'site/services/lang.service'
import i18n from './demo-native-html.component.i18n.json'

export class DemoNativeHtmlComponent extends AbstractComponent {
  static selector = "demo-native-html-component";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  title_ru = "Нативный HTML";
  title_en = "Native HTML";
  count = this.newRx(0);

  getHTML() {
    return `<div>
        <h3>{{ root.lang$.actual === 'ru' ? this.title_ru : this.title_en }}</h3>
        <button
          onclick="{{ root.count.update(root.count::rx + 1) }}"
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mt_xs">
          {{ root.t$::rx?.clicks }}: {{ root.count::rx }}
        </button>
      </div>`;
  }
}

componentsRegistryService.define(DemoNativeHtmlComponent);
