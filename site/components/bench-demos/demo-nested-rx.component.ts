import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";

export class DemoNestedRx extends AbstractComponent {
  static selector = "demo-nested-rx";

  data$ = this.newRx<{ user: { name: string; count: number }; tag: string }>({
    user: { name: "Alice", count: 0 },
    tag: "demo",
  });

  protected getHTML(): string {
    return `<div>
        <button onclick="{{ root.inc() }}" class="btn btn_s mb_s btn-primary">Increment count</button>
        <button onclick="{{ root.rename() }}" class="btn btn_s mb_s btn-secondary">Change name</button>
        <p class="mb_s">User: {{ root.data$::rx.user.name }}, count: {{ root.data$::rx.user.count }}</p>
        <p>Tag: {{ root.data$::rx.tag }}</p>
      </div>`;
  }

  inc() {
    const d = this.data$.actual;
    this.data$.update({
      ...d,
      user: { ...d.user, count: d.user.count + 1 },
    });
  }

  rename() {
    const d = this.data$.actual;
    this.data$.update({
      ...d,
      user: { ...d.user, name: d.user.name === "Alice" ? "Bob" : "Alice" },
    });
  }
}

componentsRegistryService.define(DemoNestedRx);
