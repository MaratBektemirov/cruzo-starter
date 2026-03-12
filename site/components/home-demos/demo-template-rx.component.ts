import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoTemplateRxComponent extends AbstractComponent {
  static selector = "demo-template-rx-component";

  count$ = this.newRx(0);

  getHTML() {
    return `<div class="mt_s">
        <button onclick="{{ root.count$.update(root.count$::rx + 1) }}" class="btn btn_s mb_s btn-primary">
          Clicks: <b>{{ root.count$::rx }}</b>
        </button>
      </div>`;
  }
}

componentsRegistryService.define(DemoTemplateRxComponent);
