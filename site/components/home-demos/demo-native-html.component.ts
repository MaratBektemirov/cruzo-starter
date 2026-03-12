import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoNativeHtmlComponent extends AbstractComponent {
  static selector = "demo-native-html-component";

  title = "Нативный HTML";
  count = this.newRx(0);

  getHTML() {
    return `<div>
        <h3>{{ this.title }}</h3>
        <button
          onclick="{{ root.count.update(root.count::rx + 1) }}"
          class="btn btn_s btn-primary mt_xs">
          Кликов: {{ root.count::rx }}
        </button>
      </div>`;
  }
}

componentsRegistryService.define(DemoNativeHtmlComponent);
