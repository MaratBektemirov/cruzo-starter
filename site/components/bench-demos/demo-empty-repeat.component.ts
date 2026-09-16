import { AbstractComponent, componentsRegistryService, Rx, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from './demo-empty-repeat.component.i18n.json'

export class DemoEmptyRepeat extends AbstractComponent {
  static selector = "demo-empty-repeat";

  i18n$ = i18nService.connect(this, i18n);

  items: Rx<{ id: string; label: string }>[] = [];
  count$ = this.newRx(0);

  protected getHTML(): string {
    return `<div>
        <div class="fx mb_s">
          <button onclick="{{ root.add() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s">{{ root.i18n$::rx.addItemButton }}</button>
          <button onclick="{{ root.clear() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary">{{ root.i18n$::rx.clearButton }}</button>
        </div>
        <p class="mb_s">{{ root.i18n$::rx.count }}: {{ root.count$::rx }}</p>
        <div repeat="{{ root.items }}" class="mb_xs">
          <span>{{ this::rx.id }} — {{ this::rx.label }}</span>
        </div>
        <div attached="{{ root.count$::rx === 0 }}" class="mt_s">{{ root.i18n$::rx.listEmpty }}</div>
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
