import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";

type TextItem = { id: string; value: number; label: string; status: "ok" | "pending" | "done" };

export class DemoTextBench extends AbstractComponent {
  static selector = "demo-text-bench";

  items: Rx<any>[] = [];
  private readonly size = 500;
  private readonly statuses: TextItem["status"][] = ["ok", "pending", "done"];

  protected getHTML(): string {
    return `<div>
        <div class="fx fx-gap mb_s">
          <button onclick="{{ root.updateMany() }}" class="cruzo-ui-component_button cruzo-ui-component_button-s cruzo-ui-component_button-primary">Update many</button>
          <button onclick="{{ root.rotateStatus() }}" class="cruzo-ui-component_button cruzo-ui-component_button-s cruzo-ui-component_button-secondary">Rotate status</button>
        </div>
        <div repeat="{{ root.items }}" class="mb_xs fx fx-alc">
          <span class="mr_s">#{{ this::rx.id }}</span>
          <span class="mr_s">value: {{ this::rx.value }}</span>
          <span class="mr_s">({{ this::rx.label }})</span>
          <span attached="{{ this::rx.status === 'ok' }}" class="mr_s">ok</span>
          <span attached="{{ this::rx.status === 'pending' }}" class="mr_s">pending</span>
          <span attached="{{ this::rx.status === 'done' }}" class="mr_s">done</span>
        </div>
      </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.build();
  }

  build() {
    const arr: Rx<any>[] = [];
    for (let i = 0; i < this.size; i++) {
      arr.push(this.newRx({
        id: String(i),
        value: i,
        label: `item-${i}`,
        status: this.statuses[i % 3],
      }));
    }
    this.items = arr;
    this.template.detectChanges();
  }

  updateMany() {
    for (let i = 0; i < this.items.length; i++) {
      if (Math.random() < 0.9) {
        const status = this.statuses[Math.floor(Math.random() * 3)];
        this.items[i].update({
          id: String(i),
          value: (Math.random() * 1e6) | 0,
          label: `item-${i}`,
          status,
        });
      }
    }
  }

  rotateStatus() {
    for (let i = 0; i < this.items.length; i++) {
      const v = this.items[i].actual;
      const idx = this.statuses.indexOf(v.status);
      const next = this.statuses[(idx + 1) % 3];
      this.items[i].update({ ...v, status: next });
    }
  }
}

componentsRegistryService.define(DemoTextBench);
