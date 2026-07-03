import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from 'site/services/lang.service'
import i18n from './demo-null-undefined.component.i18n.json'

export class DemoNullUndefined extends AbstractComponent {
  static selector = "demo-null-undefined";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  displayValue$ = this.newRx<string | null | undefined>("hello");

  protected getHTML(): string {
    return `<div>
        <div class="fx fx-wrap mb_s">
          <button onclick="{{ root.set('text') }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s">{{ root.t$::rx.setString }}</button>
          <button onclick="{{ root.set(null) }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary mr_s">{{ root.t$::rx.setNull }}</button>
          <button onclick="{{ root.set(undefined) }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary">{{ root.t$::rx.setUndefined }}</button>
        </div>
        <p class="mb_s">{{ root.t$::rx.value }}: [{{ root.displayValue$::rx }}]</p>
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
