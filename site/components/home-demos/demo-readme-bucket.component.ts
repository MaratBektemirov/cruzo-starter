import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo"
import { ButtonGroupComponent, ButtonGroupConfig } from "cruzo/ui-components/button-group"
import { InputComponent, InputConfig } from "cruzo/ui-components/input"
import { langService } from 'site/services/lang.service'
import i18n from './demo-readme-bucket.component.i18n.json'

export class DemoBucketComponent extends AbstractComponent {
  static selector = "demo-bucket-component";
  dependencies = new Set([InputComponent.selector, ButtonGroupComponent.selector]);

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  innerBucket = new RxBucket({
    input: { config: InputConfig({ placeholder: "Name" }) },
    buttonGroup: { config: ButtonGroupConfig({ items: [{ label: "A", value: "a" }, { label: "B", value: "b" }] }) },
  });
  inputValue$ = this.newRxValueFromBucket(this.innerBucket, "input");
  choice$ = this.newRxValueFromBucket(this.innerBucket, "buttonGroup");

  getHTML() {
    return `<div>
        <div class="mb_s">
          <input-component component-id="input" bucket-id="${this.innerBucket.id}"></input-component>
        </div>
        <div class="mb_s">
          <button-group-component component-id="buttonGroup" bucket-id="${this.innerBucket.id}"></button-group-component>
        </div>
        <div class="mt_s">
          {{ root.t$::rx?.input }}: <b>{{ root.inputValue$::rx }}</b> · {{ root.t$::rx?.choice }}: <b>{{ root.choice$::rx }}</b>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoBucketComponent);
