import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo";
import { ButtonGroupComponent, ButtonGroupConfig } from "cruzo/ui-components/button-group";

export class DemoButtonGroupBucketComponent extends AbstractComponent {
  static selector = "demo-button-group-bucket-component";
  dependencies = new Set([ButtonGroupComponent.selector]);

  innerBucket = new RxBucket({
    button_group: {
      config: ButtonGroupConfig({
        items: [
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
          { label: "Option C", value: "c" }
        ]
      })
    }
  });

  currentButtonGroupValue$ = this.newRxValueFromBucket(this.innerBucket, "button_group");

  constructor() {
    super();
  }

  getHTML() {
    return `<div>
        <button-group-component
          component-id="button_group"
          bucket-id="${this.innerBucket.id}">
        </button-group-component>

        <div class="mt_s">
          Selected: <b>{{ root.currentButtonGroupValue$::rx }}</b>
        </div>
      </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(DemoButtonGroupBucketComponent);
