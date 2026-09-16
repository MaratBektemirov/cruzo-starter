import { AbstractComponent, componentsRegistryService, RxBucket, i18nService } from "cruzo"
import { InputComponent, InputConfig } from "cruzo/ui-components/input"
import i18n from './demo-input-bucket.component.i18n.json'

export class DemoInputBucketComponent extends AbstractComponent {
  static selector = "demo-input-bucket-component";
  dependencies = new Set([InputComponent.selector]);

  i18n$ = i18nService.connect(this, i18n);

  innerBucket = new RxBucket({
    input: {
      config: InputConfig({
        placeholder: "Enter your name"
      })
    }
  });

  currentInputValue$ = this.newRxValueFromBucket(this.innerBucket, "input");

  constructor() {
    super();
  }

  getHTML() {
    return `<div>
        <input-component
          component-id="input"
          bucket-id="${this.innerBucket.id}">
        </input-component>

        <div class="mt_s">
          {{ root.i18n$::rx.value }}: <b>{{ root.currentInputValue$::rx }}</b>
        </div>
      </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(DemoInputBucketComponent);
