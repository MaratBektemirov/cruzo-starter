import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";

export class DemoNullUndefined extends AbstractComponent {
  static selector = "demo-null-undefined";

  displayValue$ = this.newRx<string | null | undefined>("hello");

  protected getHTML(): string {
    return `<div>
        <button onclick="{{ root.set('text') }}" class="btn btn_s mb_s btn-primary">Set string</button>
        <button onclick="{{ root.set(null) }}" class="btn btn_s mb_s btn-secondary">Set null</button>
        <button onclick="{{ root.set(undefined) }}" class="btn btn_s mb_s btn-secondary">Set undefined</button>
        <p class="mb_s">Value: [{{ root.displayValue$::rx }}]</p>
        <p>Type: {{ root.typeof(root.displayValue$::rx) }}</p>
      </div>`;
  }

  set(v: string | null | undefined) {
    this.displayValue$.update(v);
  }

  typeof(val: any) {
    return typeof val;
  }
}

componentsRegistryService.define(DemoNullUndefined);
