import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoRxValueComponent extends AbstractComponent {
  static selector = "demo-rx-value-component";

  count = this.newRx(0);

  getHTML() {
    return `<div><button onclick="{{ root.count.update(root.count::rx + 1) }}" class="cruzo-ui-component_button cruzo-ui-component_button-s mb_s cruzo-ui-component_button-primary">
          Clicks: <b>{{ root.count::rx }}</b>
      </button></div>`;
  }
}

componentsRegistryService.define(DemoRxValueComponent);
