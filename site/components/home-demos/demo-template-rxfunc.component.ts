import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from "site/services/lang.service"
import i18n from "./demo-template-rxfunc.component.i18n.json"

export class DemoTemplateRxFuncComponent extends AbstractComponent {
  static selector = "demo-template-rxfunc-component";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  count$ = this.newRx(0);
  factor$ = this.newRx(2);
  product$ = this.newRxFunc((c: number, f: number) => c * f, this.count$, this.factor$);

  getHTML() {
    return `<div class="mt_s">
        <button
          onclick="{{ root.count$.update(root.count$::rx + 1) }}"
          class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary mr_s"
        >{{ root.t$::rx?.countPlusOne }}</button>

        <button
          onclick="{{ root.factor$.update(root.factor$::rx + 1) }}"
          class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary"
        >{{ root.t$::rx?.factorPlusOne }}</button>

        <div class="mt_s">
          {{ root.t$::rx?.count }}: <b>{{ root.count$::rx }}</b>
          ·
          {{ root.t$::rx?.factor }}: <b>{{ root.factor$::rx }}</b>
          →
          {{ root.t$::rx?.product }}: <b>{{ root.product$::rx }}</b>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoTemplateRxFuncComponent);