import { AbstractComponent, componentsRegistryService } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoBracesManualComponent extends AbstractComponent {
  static selector = "demo-braces-manual-component";

  counter = 0;

  getHTML() {
    return `<div><button onclick="{{ root.inc() }}" class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary">
          Clicks: <b>{{ root.counter }}</b>
      </button></div>`;
  }

  inc() {
    this.counter++;
    this.template.detectChanges();
  }
}

componentsRegistryService.define(DemoBracesManualComponent);
