import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoTargetedUpdatesComponent extends AbstractComponent {
  static selector = "demo-targeted-updates-component";

  first$ = this.newRx(0);
  second$ = this.newRx(0);

  getHTML() {
    return `<div>
        <div class="mt_s">
          <button
            onclick="{{ root.first$.update(root.first$::rx + 1) }}"
            class="cruzo-ui-component_button cruzo-ui-component_button-s cruzo-ui-component_button-secondary">
            Первое: {{ root.first$::rx }}
          </button>
          <button
            onclick="{{ root.second$.update(root.second$::rx + 1) }}"
            class="cruzo-ui-component_button cruzo-ui-component_button-s cruzo-ui-component_button-secondary">
            Второе: {{ root.second$::rx }}
          </button>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoTargetedUpdatesComponent);
