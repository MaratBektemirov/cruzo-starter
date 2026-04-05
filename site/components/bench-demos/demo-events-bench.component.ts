import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";

export class DemoEventsBench extends AbstractComponent {
  static selector = "demo-events-bench";

  counters: Rx<any>[] = [];

  protected getHTML(): string {
    return `<div>
        <button onclick="{{ root.reset() }}" class="cruzo-ui-component_button cruzo-ui-component_button-s mb_s cruzo-ui-component_button-primary">
          Reset 1K counters
        </button>

        <div repeat="{{ root.counters }}" class="mb_xs fx fx-jcsb">
          <button onclick="{{ root.inc(this) }}" class="cruzo-ui-component_button cruzo-ui-component_button-xs cruzo-ui-component_button-secondary">
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
