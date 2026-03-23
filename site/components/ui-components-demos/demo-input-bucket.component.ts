import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo";
import { InputComponent, InputConfig } from "cruzo/ui-components/input";

export class DemoInputBucketComponent extends AbstractComponent {
  static selector = "demo-input-bucket-component";
  dependencies = new Set([InputComponent.selector]);

  innerBucket = new RxBucket({
    input: {
      config: InputConfig({
        placeholder: "Enter your name",
        enableContentWidth: false
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
          Value: <b>{{ root.currentInputValue$::rx }}</b>
        </div>
      </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(DemoInputBucketComponent);
