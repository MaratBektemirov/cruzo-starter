import {
  AbstractComponent,
  componentsRegistryService,
  Rx,
  RxBucket,
} from "cruzo";
import { SelectComponent, SelectConfig } from "cruzo/ui-components/select";

const MODEL_ITEMS = [
  { label: "00X00", value: 1 },
  { label: "11C22", value: 2 },
  { label: "33K44", value: 3 },
  { label: "90M90", value: 4 },
  { label: "P0P0", value: 5 },
];

export class DemoSelectBucketComponent extends AbstractComponent {
  static selector = "demo-select-bucket-component";
  dependencies = new Set([SelectComponent.selector]);

  select$: Rx<any> = null;
  selectMulti$: Rx<any> = null;

  constructor() {
    super();
    this.innerBucket = new RxBucket({
      select: {
        config: SelectConfig({
          placeholder: "Select model",
          getItems: async () => {
            return MODEL_ITEMS.slice(0);
          }
        }),
      },
      select_multi: {
        config: SelectConfig({
          multi: true,
          placeholder: "Select model",
          getItems: async () => {
            return MODEL_ITEMS.slice(0);
          }
        }),
      },
    });

    this.innerBucket.setValuesAtIndex({ select: { 1: true }, select_multi: { 1: true } });

    this.select$ = this.newRxValueFromBucket(this.innerBucket, "select");
    this.selectMulti$ = this.newRxValueFromBucket(this.innerBucket, "select_multi");
  }

  getHTML() {
    return `<div>
        <select-component
          component-id="select"
          bucket-id="${this.innerBucket.id}">
        </select-component>
        <div class="mt_s">
          Значение из bucket (value$): <b>{{ root.stringify(root.select$::rx) }}</b>
        </div>

        <select-component
          class="mt_l"
          component-id="select_multi"
          bucket-id="${this.innerBucket.id}">
        </select-component>

        <div class="mt_s">
          Значение из bucket (value$): <b>{{ root.stringify(root.selectMulti$::rx) }}</b>
        </div>
      </div>`;
  }

  stringify(v: any) {
    return JSON.stringify(v, null, 2);
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(DemoSelectBucketComponent);
