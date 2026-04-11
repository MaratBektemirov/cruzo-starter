import { AbstractComponent, componentsRegistryService } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoNativeHtmlComponent extends AbstractComponent {
  static selector = "demo-native-html-component";

  title = "Нативный HTML";
  count = this.newRx(0);

  getHTML() {
    return `<div>
        <h3>{{ this.title }}</h3>
        <button
          onclick="{{ root.count.update(root.count::rx + 1) }}"
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mt_xs">
          Кликов: {{ root.count::rx }}
        </button>
      </div>`;
  }
}

componentsRegistryService.define(DemoNativeHtmlComponent);
