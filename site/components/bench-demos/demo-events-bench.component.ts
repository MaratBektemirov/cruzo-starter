import { AbstractComponent, componentsRegistryService, Rx, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from './demo-events-bench.component.i18n.json'

export class DemoEventsBench extends AbstractComponent {
  static selector = "demo-events-bench";

  i18n$ = i18nService.connect(this, i18n);

  counters: Rx<any>[] = [];

  protected getHTML(): string {
    return `<div>
        <button onclick="{{ root.reset() }}" class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary">
          {{ root.i18n$::rx.reset }}
        </button>

        <div repeat="{{ root.counters }}" class="mb_xs fx fx-jcsb">
          <button onclick="{{ root.inc(this) }}" class="${UI_KIT}_button ${UI_KIT}_button-xs ${UI_KIT}_button-secondary">
            +1
          </button>
          <span>#{{ index }} — {{ root.i18n$::rx.value }} : <b>{{ this::rx.value }}</b></span>
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
