import { AbstractComponent, componentsRegistryService, routerService, RxBucket } from "cruzo";
import {
  SpinnerComponent,
  SpinnerConfig,
  SpinnerValue,
} from "cruzo/ui-components/spinner";

export class RouteLoadingOverlayComponent extends AbstractComponent {
  static selector = "route-loading-overlay";
  dependencies = new Set([SpinnerComponent.selector]);

  innerBucket = new RxBucket({
    routeLoading: {
      config: SpinnerConfig({
        size: "12px",
      }),
    },
  });

  constructor() {
    super();
    this.innerBucket.setValue("routeLoading", SpinnerValue.inactive);

    this.newRxFunc((loading) => {
      this.innerBucket.setValue(
        "routeLoading",
        loading ? SpinnerValue.active : SpinnerValue.inactive,
      );
    }, routerService.resourcesLoading$);
  }

  getHTML() {
    return `<div class="route-loading-overlay"
        is="spinner"
        component-id="routeLoading"
        bucket-id="${this.innerBucket.id}"></div>`;
  }
}

componentsRegistryService.define(RouteLoadingOverlayComponent);
