import { TestsComponent } from "site/components/tests/tests.component"
import { DemoRxBucketComponent } from "site/components/components-interaction-demos/demo-rx-bucket.component"
import DemoRxBucketComponentCode from "site/components/components-interaction-demos/demo-rx-bucket.component?raw"
import DemoRxBucketIndexesComponentCode from "site/components/components-interaction-demos/demo-rx-bucket-indexes.component?raw"
import { DemoRxBucketIndexesComponent } from "site/components/components-interaction-demos/demo-rx-bucket-indexes.component"
import { DocsSectionComponent } from "site/components/docs-section/docs-section.component"
import { HomeComponent } from "site/components/home/home.component"
import { exampleHttpClient, exampleInterceptors, exampleCache } from "site/routes/data/http-examples";
import { exampleRouteUrlBucket, exampleRouterHashMode, exampleRouterLifecycle, exampleRouterNavigation } from "site/routes/data/router-examples"
import { exampleRxBucketSubscribe } from "site/routes/data/rx-bucket-examples";
import { exampleAbstractComponent, exampleAbstractService } from "site/routes/data/component-service-examples";

import DemoBracesManualComponentCode from "site/components/template-engine-demos/demo-braces-manual.component?raw";
import { DemoBracesManualComponent } from "site/components/template-engine-demos/demo-braces-manual.component";
import DemoAttachedComponentCode from "site/components/template-engine-demos/demo-attached.component?raw";
import { DemoAttachedComponent } from "site/components/template-engine-demos/demo-attached.component";
import DemoHtmlEventsComponentCode from "site/components/template-engine-demos/demo-html-events.component?raw";
import { DemoHtmlEventsComponent } from "site/components/template-engine-demos/demo-html-events.component";
import DemoLetVarsComponentCode from "site/components/template-engine-demos/demo-let-vars.component?raw";
import { DemoLetVarsComponent } from "site/components/template-engine-demos/demo-let-vars.component";
import DemoRepeatComponentCode from "site/components/template-engine-demos/demo-repeat.component?raw";
import { DemoRepeatComponent } from "site/components/template-engine-demos/demo-repeat.component";
import DemoRxValueComponentCode from "site/components/template-engine-demos/demo-rx-value.component?raw";
import { DemoRxValueComponent } from "site/components/template-engine-demos/demo-rx-value.component";
import DemoJsSubsetComponentCode from "site/components/template-engine-demos/demo-js-subset.component?raw";
import { DemoJsSubsetComponent } from "site/components/template-engine-demos/demo-js-subset.component";
import DemoInnerHtmlComponentCode from "site/components/template-engine-demos/demo-inner-html.component?raw";
import { DemoInnerHtmlComponent } from "site/components/template-engine-demos/demo-inner-html.component";
import DemoOnceComponentCode from "site/components/template-engine-demos/demo-once.component?raw";
import { DemoOnceComponent } from "site/components/template-engine-demos/demo-once.component";

import DemoSelectComponentCode from "site/components/ui-components-demos/demo-select-bucket.component?raw";
import { DemoSelectBucketComponent } from "site/components/ui-components-demos/demo-select-bucket.component";
import DemoInputComponentCode from "site/components/ui-components-demos/demo-input-bucket.component?raw";
import { DemoInputBucketComponent } from "site/components/ui-components-demos/demo-input-bucket.component";
import DemoButtonGroupComponentCode from "site/components/ui-components-demos/demo-button-group-bucket.component?raw";
import { DemoButtonGroupBucketComponent } from "site/components/ui-components-demos/demo-button-group-bucket.component";
import DemoUploadComponentCode from "site/components/ui-components-demos/demo-upload-bucket.component?raw";
import { DemoUploadBucketComponent } from "site/components/ui-components-demos/demo-upload-bucket.component";
import DemoSpinnerComponentCode from "site/components/ui-components-demos/demo-spinner-bucket.component?raw";
import { DemoSpinnerBucketComponent } from "site/components/ui-components-demos/demo-spinner-bucket.component";
import DemoModalComponentCode from "site/components/ui-components-demos/demo-modal-bucket.component?raw";
import { DemoModalBucketComponent } from "site/components/ui-components-demos/demo-modal-bucket.component";
import { RouteUrlBucket } from "cruzo"
import { SectionIds } from "site/sections"
import type { AbstractComponentConstructor } from "cruzo"

export interface DocsSectionItem {
  code: string;
  id: SectionIds;
  component?: AbstractComponentConstructor;
}

export interface DocsSectionRouteData {
  sectionId: SectionIds;
  items: DocsSectionItem[];
  dependencies?: string[];
}

export const SectionsData = {
  [SectionIds["cmp-interaction"]]: {
    sectionId: SectionIds["cmp-interaction"],
    items: [
      { code: DemoRxBucketComponentCode, component: DemoRxBucketComponent, id: SectionIds["cmp-interaction"] },
      { code: exampleRxBucketSubscribe, id: SectionIds["cmp-interaction-attributes"] },
      { code: DemoRxBucketIndexesComponentCode, component: DemoRxBucketIndexesComponent, id: SectionIds["cmp-interaction-advantages"] },
    ],
    dependencies: [
      DemoRxBucketComponent.selector,
      DemoRxBucketIndexesComponent.selector,
      "input-component",
      "button-group-component",
    ],
  },
  [SectionIds.http]: {
    sectionId: SectionIds.http,
    items: [
      { code: exampleHttpClient, id: SectionIds.http },
      { code: exampleInterceptors, id: SectionIds["http-interceptors"] },
      { code: exampleCache, id: SectionIds["http-cache"] },
    ],
  },
  [SectionIds.router]: {
    sectionId: SectionIds.router,
    items: [
      { code: exampleRouteUrlBucket, id: SectionIds["router-bucket"] },
      { code: exampleRouterNavigation, id: SectionIds["router-navigation"] },
      { code: exampleRouterHashMode, id: SectionIds["router-hash-mode"] },
      { code: exampleRouterLifecycle, id: SectionIds["router-routes"] },
    ],
  },
  [SectionIds.component]: {
    sectionId: SectionIds.component,
    items: [
      { code: exampleAbstractComponent, id: SectionIds.component },
    ],
  },
  [SectionIds.service]: {
    sectionId: SectionIds.service,
    items: [
      { code: exampleAbstractService, id: SectionIds.service },
    ],
  },
  [SectionIds["template-engine"]]: {
    sectionId: SectionIds["template-engine"],
    items: [
      { code: DemoBracesManualComponentCode, component: DemoBracesManualComponent, id: SectionIds["template-engine-interpolation"] },
      { code: DemoRxValueComponentCode, component: DemoRxValueComponent, id: SectionIds["template-engine-rx"] },
      { code: DemoJsSubsetComponentCode, component: DemoJsSubsetComponent, id: SectionIds["template-engine-js-subset"] },
      { code: DemoAttachedComponentCode, component: DemoAttachedComponent, id: SectionIds["template-engine-attached"] },
      { code: DemoHtmlEventsComponentCode, component: DemoHtmlEventsComponent, id: SectionIds["template-engine-events"] },
      { code: DemoLetVarsComponentCode, component: DemoLetVarsComponent, id: SectionIds["template-engine-let"] },
      { code: DemoInnerHtmlComponentCode, component: DemoInnerHtmlComponent, id: SectionIds["template-engine-inner-html"] },
      { code: DemoOnceComponentCode, component: DemoOnceComponent, id: SectionIds["template-engine-once"] },
      { code: DemoRepeatComponentCode, component: DemoRepeatComponent, id: SectionIds["template-engine-repeat"] },
    ],
    dependencies: [
      DemoBracesManualComponent.selector,
      DemoAttachedComponent.selector,
      DemoHtmlEventsComponent.selector,
      DemoLetVarsComponent.selector,
      DemoRepeatComponent.selector,
      DemoRxValueComponent.selector,
      DemoJsSubsetComponent.selector,
      DemoInnerHtmlComponent.selector,
      DemoOnceComponent.selector,
    ],
  },
  [SectionIds["ui-components"]]: {
    sectionId: SectionIds["ui-components"],
    items: [
      { code: DemoInputComponentCode, component: DemoInputBucketComponent, id: SectionIds["ui-components-input"] },
      { code: DemoButtonGroupComponentCode, component: DemoButtonGroupBucketComponent, id: SectionIds["ui-components-button-group"] },
      { code: DemoUploadComponentCode, component: DemoUploadBucketComponent, id: SectionIds["ui-components-upload"] },
      { code: DemoSelectComponentCode, component: DemoSelectBucketComponent, id: SectionIds["ui-components-select"] },
      { code: DemoSpinnerComponentCode, component: DemoSpinnerBucketComponent, id: SectionIds["ui-components-spinner"] },
      { code: DemoModalComponentCode, component: DemoModalBucketComponent, id: SectionIds["ui-components-modal"] },
    ],
    dependencies: [
      DemoSelectBucketComponent.selector,
      DemoInputBucketComponent.selector,
      DemoButtonGroupBucketComponent.selector,
      DemoUploadBucketComponent.selector,
      DemoSpinnerBucketComponent.selector,
      DemoModalBucketComponent.selector,
      "select-component",
      "input-component",
      "button-group-component",
      "upload-component",
      '[is="spinner"]',
      "modal-component",
    ],
  }
}

export type SectionKey = keyof typeof SectionsData;

const startPath =
  import.meta.env.GITHUB_DOMAIN === "yes"
    ? `${import.meta.env.VITE_REPO_NAME}`
    : "";

export const routerUrlBucket = new RouteUrlBucket({
  main: {
    url: startPath + '/',
    componentSelectorUnbox: () => HomeComponent.selector,
    routeSelectorUnbox: () => ".section"
  },
  tests: {
    url: `${startPath}/tests`,
    componentSelectorUnbox: () => TestsComponent.selector,
    routeSelectorUnbox: () => ".section"
  },
  docsDefault: {
    url: `${startPath}/docs`,
    redirectTo: `${startPath}/docs/template-engine`,
  },
  docs: {
    url: `${startPath}/docs/:section`,
    componentSelectorUnbox: () => DocsSectionComponent.selector,
    routeSelectorUnbox: () => ".section",
  },
})