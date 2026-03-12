import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";

export class DemoEmptyRepeat extends AbstractComponent {
  static selector = "demo-empty-repeat";

  items: Rx<{ id: string; label: string }>[] = [];
  count$ = this.newRx(0);

  protected getHTML(): string {
    return `<div>
        <button onclick="{{ root.add() }}" class="btn btn_s mb_s btn-primary">Add item</button>
        <button onclick="{{ root.clear() }}" class="btn btn_s mb_s btn-secondary">Clear</button>
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
