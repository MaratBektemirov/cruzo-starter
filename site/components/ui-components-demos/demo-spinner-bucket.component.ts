import { AbstractComponent, componentsRegistryService, delay, RxBucket } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import {
  SpinnerComponent,
  SpinnerConfig,
  SpinnerValue,
} from "cruzo/ui-components/spinner"
import { langService } from "site/services/lang.service"
import i18n from "./demo-spinner-bucket.component.i18n.json"

export class DemoSpinnerBucketComponent extends AbstractComponent {
  static selector = "demo-spinner-bucket-component";
  dependencies = new Set([SpinnerComponent.selector]);

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  innerBucket = new RxBucket({
    spinner: {
      config: SpinnerConfig({
        color: "#fff",
        size: "8px",
      }),
    },
  });

  spinnerState$ = this.newRxValueFromBucket(this.innerBucket, "spinner");

  constructor() {
    super();
    this.innerBucket.setValue("spinner", SpinnerValue.inactive);
  }

  getHTML() {
    return `<div>
        <button
          is="spinner"
          component-id="spinner"
          bucket-id="${this.innerBucket.id}"
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary"
          onclick="{{ root.simulateLoading() }}"
        >
          {{ root.t$::rx.simulateLoading }}
        </button>

        <div class="mt_s">
          {{ root.t$::rx.spinnerState }}:
          <b>{{ root.spinnerState$::rx ?? root.t$::rx.inactive }}</b>
        </div>
      </div>`;
  }

  async simulateLoading() {
    if (this.spinnerState$.actual === SpinnerValue.active) return;

    this.innerBucket.setValue("spinner", SpinnerValue.active);

    await delay(1200);

    this.innerBucket.setValue("spinner", SpinnerValue.inactive);
  }
}

componentsRegistryService.define(DemoSpinnerBucketComponent);