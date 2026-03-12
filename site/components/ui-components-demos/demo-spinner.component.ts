import { AbstractComponent, componentsRegistryService, delay, RxScope } from "cruzo";
import {
  SpinnerComponent,
  SpinnerConfig,
  SpinnerValue,
} from "cruzo/ui-components/spinner";

export class DemoSpinnerScopeComponent extends AbstractComponent {
  static selector = "demo-spinner-scope-component";
  dependencies = new Set([SpinnerComponent.selector]);

  innerScope = new RxScope({
    spinner: {
      config: SpinnerConfig({
        color: "#fff",
        size: "8px",
      }),
    },
  });

  spinnerState$ = this.newRxValueFromScope(this.innerScope, "spinner");

  constructor() {
    super();
    this.innerScope.setValue("spinner", SpinnerValue.inactive);
  }

  getHTML() {
    return `<div>
        <button
          is="spinner"
          component-id="spinner"
          scope-id="${this.innerScope.id}"
          class="btn btn_s btn-primary"
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

    this.innerScope.setValue("spinner", SpinnerValue.active);

    await delay(1200)

    this.innerScope.setValue("spinner", SpinnerValue.inactive);
  }
}

componentsRegistryService.define(DemoSpinnerScopeComponent);
