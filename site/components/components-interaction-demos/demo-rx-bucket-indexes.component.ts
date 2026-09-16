import { AbstractComponent, componentsRegistryService, RxBucket, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { InputComponent, InputConfig } from "cruzo/ui-components/input"
import i18n from './demo-rx-bucket-indexes.component.i18n.json'

export class DemoRxBucketIndexesComponent extends AbstractComponent {
  static selector = "demo-rx-bucket-indexes-component";
  dependencies = new Set([InputComponent.selector]);

  i18n$ = i18nService.connect(this, i18n);

  innerBucket = new RxBucket({
    input: {
      config: InputConfig({
        placeholder: "Type value",
      }),
    },
  });

  private inputAt0$ = this.newRxValueFromBucket(this.innerBucket, "input", "0");
  private inputAt1$ = this.newRxValueFromBucket(this.innerBucket, "input", "1");

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
          <div><b>{{ root.i18n$::rx.index }} {{ this }}</b></div>
          <input-component
            component-id="input"
            bucket-id="${this.innerBucket.id}"
            component-index="{{ index }}">
          </input-component>
          <div class="mt_xs fx">
            <button class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_xs" onclick="{{ root.fillRow(index) }}">{{ root.i18n$::rx.setByIndex }}</button>
            <button class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary" onclick="{{ root.clearRow(index) }}">{{ root.i18n$::rx.clear }}</button>
          </div>
          <div class="mt_xs">
            {{ root.i18n$::rx.current }}: <b>{{ root.valuesByIndex$::rx?.[index] ?? "-" }}</b>
          </div>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoRxBucketIndexesComponent);
