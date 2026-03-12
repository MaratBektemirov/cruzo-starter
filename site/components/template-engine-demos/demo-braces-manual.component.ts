import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoBracesManualComponent extends AbstractComponent {
  static selector = "demo-braces-manual-component";

  counter = 0;

  getHTML() {
    return `<div><button onclick="{{ root.inc() }}" class="btn btn_s mb_s btn-primary">
          Clicks: <b>{{ root.counter }}</b>
      </button></div>`;
  }

  inc() {
    this.counter++;
    this.template.detectChanges();
  }
}

componentsRegistryService.define(DemoBracesManualComponent);
