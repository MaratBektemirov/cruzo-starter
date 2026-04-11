import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoEventsBench extends AbstractComponent {
  static selector = "demo-events-bench";

  counters: Rx<any>[] = [];

  protected getHTML(): string {
    return `<div>
        <button onclick="{{ root.reset() }}" class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary">
          Reset 1K counters
        </button>

        <div repeat="{{ root.counters }}" class="mb_xs fx fx-jcsb">
          <button onclick="{{ root.inc(this) }}" class="${UI_KIT}_button ${UI_KIT}_button-xs ${UI_KIT}_button-secondary">
            +1
          </button>
          <span>#{{ index }} — value: <b>{{ this::rx.value }}</b></span>
        </div>
      </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.build();
  }

  build() {
    const arr: Rx<any>[] = [];
    for (let i = 0; i < 1000; i++) {
      arr.push(this.newRx({ value: 0 }));
    }
    this.counters = arr;
    this.template.detectChanges();
  }

  inc(rx: Rx<any>) {
    if (!rx) return;
    rx.update({ value: (rx.actual?.value ?? 0) + 1 });
  }

  reset() {
    for (let i = 0; i < this.counters.length; i++) {
      this.counters[i].update({ value: 0 });
    }
  }
}

componentsRegistryService.define(DemoEventsBench);
