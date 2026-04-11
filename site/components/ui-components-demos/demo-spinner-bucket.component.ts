import { AbstractComponent, componentsRegistryService, delay, RxBucket } from "cruzo";
import {
  SpinnerComponent,
  SpinnerConfig,
  SpinnerValue,
} from "cruzo/ui-components/spinner";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoSpinnerBucketComponent extends AbstractComponent {
  static selector = "demo-spinner-bucket-component";
  dependencies = new Set([SpinnerComponent.selector]);

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
          onclick="{{ root.simulateLoading() }}">
          Simulate loading
        </button>

        <div class="mt_s">
          Spinner state: <b>{{ root.spinnerState$::rx ?? "inactive" }}</b>
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
