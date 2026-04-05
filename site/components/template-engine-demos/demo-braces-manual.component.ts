import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoBracesManualComponent extends AbstractComponent {
  static selector = "demo-braces-manual-component";

  counter = 0;

  getHTML() {
    return `<div><button onclick="{{ root.inc() }}" class="cruzo-ui-component_button cruzo-ui-component_button-s mb_s cruzo-ui-component_button-primary">
          Clicks: <b>{{ root.counter }}</b>
      </button></div>`;
  }

  inc() {
    this.counter++;
    this.template.detectChanges();
  }
}

componentsRegistryService.define(DemoBracesManualComponent);
