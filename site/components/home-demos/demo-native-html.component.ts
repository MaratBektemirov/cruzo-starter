import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from './demo-native-html.component.i18n.json'

export class DemoNativeHtmlComponent extends AbstractComponent {
  static selector = "demo-native-html-component";

  i18n$ = i18nService.connect(this, i18n);

  count = this.newRx(0);

  getHTML() {
    return `<div>
        <h3>{{ root.i18n$::rx.title }}</h3>
        <button
          onclick="{{ root.count.update(root.count::rx + 1) }}"
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mt_xs">
          {{ root.i18n$::rx.clicks }}: {{ root.count::rx }}
        </button>
      </div>`;
  }
}

componentsRegistryService.define(DemoNativeHtmlComponent);
