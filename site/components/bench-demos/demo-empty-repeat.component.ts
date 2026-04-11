import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoEmptyRepeat extends AbstractComponent {
  static selector = "demo-empty-repeat";

  items: Rx<{ id: string; label: string }>[] = [];
  count$ = this.newRx(0);

  protected getHTML(): string {
    return `<div>
        <div class="fx mb_s">
          <button onclick="{{ root.add() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s">Add item</button>
          <button onclick="{{ root.clear() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary">Clear</button>
        </div>
        <p class="mb_s">Count: {{ root.count$::rx }}</p>
        <div repeat="{{ root.items }}" class="mb_xs">
          <span>{{ this::rx.id }} — {{ this::rx.label }}</span>
        </div>
        <div attached="{{ root.count$::rx === 0 }}" class="mt_s">List is empty.</div>
      </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.items = [];
    this.count$.update(0);
    this.template.detectChanges();
  }

  add() {
    const n = this.items.length;
    this.items = [...this.items, this.newRx({ id: String(n), label: `Item ${n}` })];
    this.count$.update(this.items.length);
    this.template.detectChanges();
  }

  clear() {
    this.items = [];
    this.count$.update(0);
    this.template.detectChanges();
  }
}

componentsRegistryService.define(DemoEmptyRepeat);
