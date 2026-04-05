import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoTemplateRxFuncComponent extends AbstractComponent {
  static selector = "demo-template-rxfunc-component";

  count$ = this.newRx(0);
  factor$ = this.newRx(2);
  product$ = this.newRxFunc((c: number, f: number) => c * f, this.count$, this.factor$);

  getHTML() {
    return `<div class="mt_s">
        <button onclick="{{ root.count$.update(root.count$::rx + 1) }}" class="cruzo-ui-component_button cruzo-ui-component_button-s mb_s cruzo-ui-component_button-primary">count +1</button>
        <button onclick="{{ root.factor$.update(root.factor$::rx + 1) }}" class="cruzo-ui-component_button cruzo-ui-component_button-s mb_s cruzo-ui-component_button-primary ml_s">factor +1</button>
        <div class="mt_s">count: <b>{{ root.count$::rx }}</b> · factor: <b>{{ root.factor$::rx }}</b> → product: <b>{{ root.product$::rx }}</b></div>
      </div>`;
  }
}

componentsRegistryService.define(DemoTemplateRxFuncComponent);
