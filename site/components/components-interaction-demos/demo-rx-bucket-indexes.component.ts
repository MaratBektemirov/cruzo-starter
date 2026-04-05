import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo";
import { InputComponent, InputConfig } from "cruzo/ui-components/input";

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

  valuesByIndex$ = this.newRxValueFromBucketByIndex(this.innerBucket, "input");

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
            <button class="cruzo-ui-component_button cruzo-ui-component_button-s cruzo-ui-component_button-primary" onclick="{{ root.fillRow(index) }}">Set by index</button>
            <button class="cruzo-ui-component_button cruzo-ui-component_button-s cruzo-ui-component_button-secondary ml_xs" onclick="{{ root.clearRow(index) }}">Clear</button>
          </div>
          <div class="mt_xs">
            Current: <b>{{ root.valuesByIndex$::rx?.[index] ?? "-" }}</b>
          </div>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoRxBucketIndexesComponent);
