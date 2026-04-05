import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoAttachedComponent extends AbstractComponent {
  static selector = "demo-attached-component";

  open = this.newRx(true);

  protected getHTML(): string {
    return `<div>
        <button class="cruzo-ui-component_button cruzo-ui-component_button-s mb_s cruzo-ui-component_button-primary" onclick="{{ root.open.update(!root.open::rx) }}">
          Toggle
        </button>

        <div attached="{{ root.open::rx }}" class="description-note">
          Этот блок реально присутствует в DOM только когда <code class="description-inline-code">open === true</code>
        </div>

        <div class="mt_s">
          open: <b>{{ root.open::rx }}</b>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoAttachedComponent);
