import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from 'site/services/lang.service'
import i18n from './demo-template-rx.component.i18n.json'

export class DemoTemplateRxComponent extends AbstractComponent {
  static selector = "demo-template-rx-component";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  count$ = this.newRx(0);

  getHTML() {
    return `<div class="mt_s">
        <button onclick="{{ root.count$.update(root.count$::rx + 1) }}" class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary">
          {{ root.t$::rx?.clicks}}: <b>{{ root.count$::rx }}</b>
        </button>
      </div>`;
  }
}

componentsRegistryService.define(DemoTemplateRxComponent);
