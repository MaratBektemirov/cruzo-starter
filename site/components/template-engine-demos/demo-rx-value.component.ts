import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from './demo-rx-value.component.18n.json'

export class DemoRxValueComponent extends AbstractComponent {
  static selector = "demo-rx-value-component";

  i18n$ = i18nService.connect(this, i18n);
  count = this.newRx(0);

  getHTML() {
    return `<div><button onclick="{{ root.count.update(root.count::rx + 1) }}" class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary">
          {{ root.i18n$::rx.clicks}}: <b>{{ root.count::rx }}</b>
      </button></div>`;
  }
}

componentsRegistryService.define(DemoRxValueComponent);