import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from './demo-null-undefined.component.i18n.json'

export class DemoNullUndefined extends AbstractComponent {
  static selector = "demo-null-undefined";

  i18n$ = i18nService.connect(this, i18n);


  displayValue$ = this.newRx<string | null | undefined>("hello");

  protected getHTML(): string {
    return `<div>
        <div class="fx fx-wrap mb_s">
          <button onclick="{{ root.set('text') }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s">{{ root.i18n$::rx.setString }}</button>
          <button onclick="{{ root.set(null) }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary mr_s">{{ root.i18n$::rx.setNull }}</button>
          <button onclick="{{ root.set(undefined) }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary">{{ root.i18n$::rx.setUndefined }}</button>
        </div>
        <p class="mb_s">{{ root.i18n$::rx.value }}: [{{ root.displayValue$::rx }}]</p>
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
