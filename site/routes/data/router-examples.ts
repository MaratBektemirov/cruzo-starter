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
routerService.scrollToHashElement();
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
// "/profile/42"

bucket.destroy();
`;
