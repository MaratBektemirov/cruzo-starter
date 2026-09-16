import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from "./demo-template-rxfunc.component.i18n.json"

export class DemoTemplateRxFuncComponent extends AbstractComponent {
  static selector = "demo-template-rxfunc-component";

  i18n$ = i18nService.connect(this, i18n);

  count$ = this.newRx(0);
  factor$ = this.newRx(2);
  product$ = this.newRxFunc((c: number, f: number) => c * f, this.count$, this.factor$);

  getHTML() {
    return `<div class="mt_s">
        <button
          onclick="{{ root.count$.update(root.count$::rx + 1) }}"
          class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary mr_s"
        >{{ root.i18n$::rx.countPlusOne }}</button>

        <button
          onclick="{{ root.factor$.update(root.factor$::rx + 1) }}"
          class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary"
        >{{ root.i18n$::rx.factorPlusOne }}</button>

        <div class="mt_s">
          {{ root.i18n$::rx.count }}: <b>{{ root.count$::rx }}</b>
          ·
          {{ root.i18n$::rx.factor }}: <b>{{ root.factor$::rx }}</b>
          →
          {{ root.i18n$::rx.product }}: <b>{{ root.product$::rx }}</b>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoTemplateRxFuncComponent);