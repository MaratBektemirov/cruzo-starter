import { AbstractComponent, componentsRegistryService, Rx } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from 'site/services/lang.service'
import i18n from './demo-empty-repeat.component.i18n.json'

export class DemoEmptyRepeat extends AbstractComponent {
  static selector = "demo-empty-repeat";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  items: Rx<{ id: string; label: string }>[] = [];
  count$ = this.newRx(0);

  protected getHTML(): string {
    return `<div>
        <div class="fx mb_s">
          <button onclick="{{ root.add() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s">{{ root.t$::rx?.addItemButton }}</button>
          <button onclick="{{ root.clear() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary">{{ root.t$::rx?.clearButton }}</button>
        </div>
        <p class="mb_s">{{ root.t$::rx?.count }}: {{ root.count$::rx }}</p>
        <div repeat="{{ root.items }}" class="mb_xs">
          <span>{{ this::rx.id }} — {{ this::rx.label }}</span>
        </div>
        <div attached="{{ root.count$::rx === 0 }}" class="mt_s">{{ root.t$::rx.listEmpty }}</div>
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
