import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";

type ListItem = { id: string; value: number; name: string; tag: string; active: boolean };

export class DemoListBench extends AbstractComponent {
  static selector = "demo-list-bench";

  items: Rx<ListItem>[] = [];
  private readonly size = 2000;
  private readonly tags = ["a", "b", "c", "d"];

  protected getHTML(): string {
    return `<div>
        <div class="fx fx-gap mb_s">
          <button onclick="{{ root.updateMany() }}" class="btn btn_s btn-primary">Update many</button>
          <button onclick="{{ root.toggleActive() }}" class="btn btn_s btn-secondary">Toggle active</button>
        </div>
        <div repeat="{{ root.items }}" class="mb_xs fx fx-alc fx-wrap" let-active="{{ this::rx.active }}">
          <span class="mr_s">#{{ this::rx.id }}</span>
          <span class="mr_s">{{ this::rx.name }}</span>
          <span class="mr_s">value: {{ this::rx.value }}</span>
          <span class="mr_s">[{{ this::rx.tag }}]</span>
          <span attached="{{ active }}" class="mr_s">active</span>
          <span attached="{{ !active }}" class="mr_s">—</span>
        </div>
      </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
    this.build();
  }

  build() {
    for (let i = 0; i < this.size; i++) {
      this.items.push(this.newRx({
        id: String(i),
        value: i,
        name: `row-${i}`,
        tag: this.tags[i % this.tags.length],
        active: i % 2 === 0,
      }));
    }
    this.template.detectChanges();
  }

  updateMany() {
    for (let i = 0; i < this.items.length; i++) {
      if (Math.random() < 0.6) {
        const v = this.items[i].actual;
        this.items[i].update({
          ...v,
          id: String(i),
          value: (Math.random() * 1e6) | 0,
          name: `row-${i}`,
          tag: this.tags[Math.floor(Math.random() * this.tags.length)],
        });
      }
    }
  }

  toggleActive() {
    for (let i = 0; i < this.items.length; i++) {
      const v = this.items[i].actual;
      this.items[i].update({ ...v, active: !v.active });
    }
  }
}

componentsRegistryService.define(DemoListBench);
