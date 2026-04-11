import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo";
import { InputComponent, InputConfig } from "cruzo/ui-components/input";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoRxBucketIndexesComponent extends AbstractComponent {
  static selector = "demo-rx-bucket-indexes-component";
  dependencies = new Set([InputComponent.selector]);

  innerBucket = new RxBucket({
    input: {
      config: InputConfig({
        placeholder: "Type value",
      }),
    },
  });

  private inputAt0$ = this.newRxValueFromBucket(this.innerBucket, "input", "0");
  private inputAt1$ = this.newRxValueFromBucket(this.innerBucket, "input", "1");

  /** Снимок значений по индексам: комбинация потоков per-index (см. newRxValueFromBucket в AbstractComponent). */
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
          <div><b>Index {{ this }}</b></div>
          <input-component
            component-id="input"
            bucket-id="${this.innerBucket.id}"
            component-index="{{ index }}">
          </input-component>
          <div class="mt_xs fx">
            <button class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_xs" onclick="{{ root.fillRow(index) }}">Set by index</button>
            <button class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary" onclick="{{ root.clearRow(index) }}">Clear</button>
          </div>
          <div class="mt_xs">
            Current: <b>{{ root.valuesByIndex$::rx?.[index] ?? "-" }}</b>
          </div>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoRxBucketIndexesComponent);
