export const exampleRouteUrlBucket = `import { RouteUrlBucket } from "cruzo";
import { HomeComponent } from "./home.component";
import { DocsSectionComponent } from "./docs-section.component";
import { ErrorComponent } from "./error.component";

const routerUrlBucket = new RouteUrlBucket({
  main: {
    url: "/",
    componentSelectorUnbox: () => HomeComponent.selector,
    routeSelectorUnbox: () => ".section",
  },
  docs: {
    url: "/docs/:section",
    componentSelectorUnbox: () => DocsSectionComponent.selector,
    routeSelectorUnbox: () => ".section",
  },
  docsDefault: {
    url: "/docs",
    redirectTo: "/docs/template-engine",
  },
  notFound: {
    url: "/:anyPath",
    componentSelectorUnbox: () => ErrorComponent.selector,
    routeSelectorUnbox: () => ".section",
  },
});

routerUrlBucket.buildUrl("main");
routerUrlBucket.buildUrl("docs", { section: "http" });
`;

export const exampleRouterNavigation = `import { routerService } from "cruzo";

routerService.pushHistory("/docs/router");

const href = "/docs/http";
const isActive = routerService.hrefIsActive(href, { startsWith: true });

if (isActive) {
  console.log("HTTP section is active");
}

routerService.update();
`;

export const exampleRouterHashMode = `import { routerService } from "cruzo";
import { routerUrlBucket } from "./urls";

routerService.setHashMode(true);
routerService.update();
`;

export const exampleRouterLifecycle = `import { RouteUrlBucket } from "cruzo";

const bucket = new RouteUrlBucket({
  profile: {
    url: "/profile/:id",
    componentSelectorUnbox: () => "profile-component",
    routeSelectorUnbox: () => ".section",
    onLoadRoute: () => {
      console.log("profile loaded");
    },
    onUnloadRoute: () => {
      console.log("profile unloaded");
    },
  },
});

const profileUrl = bucket.buildUrl("profile", { id: "42" });
`;

export const exampleRouterLoadResources = `import { RouteUrlBucket, delay, routerService, RxBucket } from "cruzo";
import {
  SpinnerComponent,
  SpinnerConfig,
  SpinnerValue,
} from "cruzo/ui-components/spinner";

export const routerUrlBucket = new RouteUrlBucket({
  lazyDemo: {
    url: "/lazy-demo",
    componentSelectorUnbox: () => "demo-lazy-page-component",
    routeSelectorUnbox: () => ".section",
    loadResources: async () => {
      await delay(2000);
      await import("./demo-lazy-page.component");
    },
  },
});

class RouteLoadingOverlay extends AbstractComponent {
  innerBucket = new RxBucket({
    routeLoading: { config: SpinnerConfig({ size: "12px" }) },
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
    return \`<div class="route-loading-overlay"
        is="spinner"
        component-id="routeLoading"
        bucket-id="\${this.innerBucket.id}"></div>\`;
  }
}

routerService.pushHistory(routerUrlBucket.buildUrl("lazyDemo"));
`;
