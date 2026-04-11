import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoMountBench extends AbstractComponent {
  static selector = "demo-mount-bench";

  mounted = this.newRx(true);
  items: Rx<any>[] = [];

  protected getHTML(): string {
    return `<div>
        <div class="fx fx-alc mb_s">
          <button onclick="{{ root.mount() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s">Mount</button>
          <button onclick="{{ root.unmount() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary">Unmount</button>
          <span class="ml_s">mounted: <b>{{ root.mounted::rx }}</b></span>
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
