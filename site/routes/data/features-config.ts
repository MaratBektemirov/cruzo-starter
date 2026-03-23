import { SectionIds } from "site/sections";
import type { DocsSectionRouteData } from "site/urls";

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

import { exampleRouteUrlBucket, exampleRouterLifecycle, exampleRouterNavigation } from "site/routes/data/router-examples";
import { exampleHttpClient, exampleInterceptors, exampleCache } from "site/routes/data/http-examples";
import { exampleRxBucketSubscribe } from "site/routes/data/rx-bucket-examples";
import { exampleAbstractComponent, exampleAbstractService } from "site/routes/data/component-service-examples";
import { DemoRxBucketComponent } from "site/components/components-interaction-demos/demo-rx-bucket.component";
import DemoRxBucketComponentCode from "site/components/components-interaction-demos/demo-rx-bucket.component?raw";
import DemoRxBucketIndexesComponentCode from "site/components/components-interaction-demos/demo-rx-bucket-indexes.component?raw";
import { DemoRxBucketIndexesComponent } from "site/components/components-interaction-demos/demo-rx-bucket-indexes.component";

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

const FEATURES_CONFIG: Record<string, DocsSectionRouteData> = {
  "template-engine": {
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
  router: {
    sectionId: SectionIds.router,
    items: [
      { code: exampleRouteUrlBucket, id: SectionIds["router-bucket"] },
      { code: exampleRouterNavigation, id: SectionIds["router-navigation"] },
      { code: exampleRouterLifecycle, id: SectionIds["router-routes"] },
    ],
  },
  http: {
    sectionId: SectionIds.http,
    items: [
      { code: exampleHttpClient, id: SectionIds.http },
      { code: exampleInterceptors, id: SectionIds["http-interceptors"] },
      { code: exampleCache, id: SectionIds["http-cache"] },
    ],
  },
  component: {
    sectionId: SectionIds.component,
    items: [
      { code: exampleAbstractComponent, id: SectionIds.component },
    ],
  },
  service: {
    sectionId: SectionIds.service,
    items: [
      { code: exampleAbstractService, id: SectionIds.service },
    ],
  },
  "components-interaction": {
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
  "ui-components": {
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
  },
};

const SECTIONS_WITH_FULL_SCREEN = new Set(["http", "component", "service", "components-interaction", "ui-components"]);

export function getFeaturesConfig(section: string): DocsSectionRouteData | null {
  return FEATURES_CONFIG[section] ?? null;
}

export function featuresSectionNeedsFullScreen(section: string): boolean {
  return SECTIONS_WITH_FULL_SCREEN.has(section);
}

export const FEATURES_SECTION_IDS = Object.keys(FEATURES_CONFIG) as string[];
