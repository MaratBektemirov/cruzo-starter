import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { InputComponent, InputConfig } from "cruzo/ui-components/input"
import { langService } from 'site/services/lang.service'
import i18n from './demo-rx-bucket-indexes.component.i18n.json'

export class DemoRxBucketIndexesComponent extends AbstractComponent {
  static selector = "demo-rx-bucket-indexes-component";
  dependencies = new Set([InputComponent.selector]);

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  innerBucket = new RxBucket({
    input: {
      config: InputConfig({
        placeholder: "Type value",
      }),
    },
  });

  private inputAt0$ = this.newRxValueFromBucket(this.innerBucket, "input", "0");
  private inputAt1$ = this.newRxValueFromBucket(this.innerBucket, "input", "1");

  /** Per-index value snapshot: combine per-index streams (see newRxValueFromBucket on AbstractComponent). */
  valuesByIndex$ = this.newRxFunc(
    (v0, v1) => ({ "0": v0, "1": v1 }),
    this.inputAt0$,
    this.inputAt1$
  );

  fillRow(index: string) {
    this.innerBucket.setValue("input", `Input ${index} updated`, index);
  }

  clearRow(index: string) {
    this.innerBucket.setValue("input", "", index);
  }

  getHTML() {
    return `<div>
        <div repeat="{{2}}" class="mb_s">
          <div><b>{{ root.t$::rx.index }} {{ this }}</b></div>
          <input-component
            component-id="input"
            bucket-id="${this.innerBucket.id}"
            component-index="{{ index }}">
          </input-component>
          <div class="mt_xs fx">
            <button class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_xs" onclick="{{ root.fillRow(index) }}">{{ root.t$::rx.setByIndex }}</button>
            <button class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary" onclick="{{ root.clearRow(index) }}">{{ root.t$::rx.clear }}</button>
          </div>
          <div class="mt_xs">
            {{ root.t$::rx.current }}: <b>{{ root.valuesByIndex$::rx?.[index] ?? "-" }}</b>
          </div>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoRxBucketIndexesComponent);
