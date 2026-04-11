import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoNullUndefined extends AbstractComponent {
  static selector = "demo-null-undefined";

  displayValue$ = this.newRx<string | null | undefined>("hello");

  protected getHTML(): string {
    return `<div>
        <div class="fx fx-wrap mb_s">
          <button onclick="{{ root.set('text') }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s">Set string</button>
          <button onclick="{{ root.set(null) }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary mr_s">Set null</button>
          <button onclick="{{ root.set(undefined) }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary">Set undefined</button>
        </div>
        <p class="mb_s">Value: [{{ root.displayValue$::rx }}]</p>
        <p>Type: {{ root.typeof(root.displayValue$::rx) }}</p>
      </div>`;
  }

  set(v: string | null | undefined) {
    this.displayValue$.update(v);
  }

  typeof(val: any) {
    return typeof val;
  }
}

componentsRegistryService.define(DemoNullUndefined);
