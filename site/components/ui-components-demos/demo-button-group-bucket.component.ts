import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo"
import { ButtonGroupComponent, ButtonGroupConfig } from "cruzo/ui-components/button-group"
import { langService } from 'site/services/lang.service'
import i18n from './demo-button-group-bucket.component.i18n.json'

export class DemoButtonGroupBucketComponent extends AbstractComponent {
  static selector = "demo-button-group-bucket-component";
  dependencies = new Set([ButtonGroupComponent.selector]);

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  innerBucket = new RxBucket({
    button_group: {
      config: ButtonGroupConfig({
        items: [
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
          { label: "Option C", value: "c" }
        ],
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
          {{ root.t$::rx.selected }}: <b>{{ root.currentButtonGroupValue$::rx }}</b>
        </div>
      </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(DemoButtonGroupBucketComponent);
