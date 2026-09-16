import { AbstractComponent, componentsRegistryService, RxBucket, i18nService } from "cruzo"
import { ButtonGroupComponent, ButtonGroupConfig } from "cruzo/ui-components/button-group"
import { InputComponent, InputConfig } from "cruzo/ui-components/input"
import i18n from './demo-rx-bucket.component.i18n.json'

export class DemoRxBucketComponent extends AbstractComponent {
  static selector = "demo-rx-bucket-component";
  dependencies = new Set([InputComponent.selector, ButtonGroupComponent.selector]);

  i18n$ = i18nService.connect(this, i18n);

  innerBucket = new RxBucket({
    input: { config: InputConfig({ placeholder: "Enter your name" }) },
    buttonGroup: {
      config: ButtonGroupConfig({
        items: [
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
          { label: "Option C", value: "c" }
        ]
      })
    }
  });

  currentInputValue$ = this.newRxValueFromBucket(this.innerBucket, "input");
  currentButtonGroupValue$ = this.newRxValueFromBucket(this.innerBucket, "buttonGroup");

  constructor() {
    super();
  }

  getHTML() {
    return `<div>
        <div class="mb_m">
          <input-component
            component-id="input"
            bucket-id="${this.innerBucket.id}">
          </input-component>
        </div>

        <div class="mb_m">
          <button-group-component
            component-id="buttonGroup"
            bucket-id="${this.innerBucket.id}">
          </button-group-component>
        </div>

        <div class="mt_s">
          <div>{{ root.i18n$::rx.input }}: <b>{{ root.currentInputValue$::rx }}</b></div>
          <div class="mt_xs">{{ root.i18n$::rx.selected }}: <b>{{ root.currentButtonGroupValue$::rx }}</b></div>
        </div>
      </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(DemoRxBucketComponent);
