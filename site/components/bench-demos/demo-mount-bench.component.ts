import { AbstractComponent, componentsRegistryService, Rx } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from 'site/services/lang.service'
import i18n from './demo-mount-bench.component.i18n.json'

export class DemoMountBench extends AbstractComponent {
  static selector = "demo-mount-bench";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  mounted = this.newRx(true);
  items: Rx<any>[] = [];

  protected getHTML(): string {
    return `<div>
        <div class="fx fx-alc mb_s">
          <button onclick="{{ root.mount() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s">{{ root.t$::rx.mountButton }}</button>
          <button onclick="{{ root.unmount() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary">{{ root.t$::rx.unmountButton }}</button>
          <span class="ml_s">{{ root.t$::rx.mounted }}: <b>{{ root.mounted::rx }}</b></span>
        </div>

        <div repeat="{{ root.items }}" class="mb_xs">
          <span>#{{ this::rx.id }} — {{ this::rx.value }}</span>
        </div>
      </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.mount();
  }

  private buildItems(size: number): Rx<any>[] {
    const arr: Rx<any>[] = [];
    for (let i = 0; i < size; i++) {
      arr.push(this.newRx({ id: String(i), value: "mounted row " + i }));
    }
    return arr;
  }

  mount() {
    this.mounted.update(true);
    this.items = this.buildItems(3000);
    this.template.detectChanges();
  }

  unmount() {
    this.mounted.update(false);
    this.items = [];
    this.template.detectChanges();
  }
}

componentsRegistryService.define(DemoMountBench);
