import type { AbstractComponentConstructor } from "cruzo";
import { SectionIds } from "site/sections";

import { DemoTemplateSimpleComponent } from "site/components/home-demos/demo-template-simple.component";
import DemoTemplateSimpleComponentCode from "site/components/home-demos/demo-template-simple.component?raw";
import { DemoTemplateRxComponent } from "site/components/home-demos/demo-template-rx.component";
import DemoTemplateRxComponentCode from "site/components/home-demos/demo-template-rx.component?raw";
import { DemoTemplateRxFuncComponent } from "site/components/home-demos/demo-template-rxfunc.component";
import DemoTemplateRxFuncComponentCode from "site/components/home-demos/demo-template-rxfunc.component?raw";
import { DemoComponent } from "site/components/home-demos/demo-readme-1.component";
import DemoComponentCode from "site/components/home-demos/demo-readme-1.component?raw";
import { DemoExpressionsComponent } from "site/components/home-demos/demo-readme-2.component";
import DemoExpressionsComponentCode from "site/components/home-demos/demo-readme-2.component?raw";
import { DemoBucketComponent } from "site/components/home-demos/demo-readme-bucket.component";
import DemoBucketComponentCode from "site/components/home-demos/demo-readme-bucket.component?raw";
import { DemoRouterLazyComponent } from "site/components/router-demos/demo-router-lazy.component";
import { exampleRouterLoadResources } from "site/routes/data/router-examples";

export interface HomeSectionItem {
  id: SectionIds;
  code: string;
  lang?: string;
  component?: AbstractComponentConstructor;
}

const CODE_README = {
  templateSimple: DemoTemplateSimpleComponentCode,

  templateRx: DemoTemplateRxComponentCode,

  templateRxFunc: DemoTemplateRxFuncComponentCode,

  install: `npm install cruzo`,

  bootstrap: `import { componentsRegistryService } from "cruzo";
componentsRegistryService.initApp();`,

  example1: DemoComponentCode,

  example2: DemoExpressionsComponentCode,

  example3: DemoBucketComponentCode,

  http: `import { HttpClient } from "cruzo";

const client = new HttpClient("https://api.example.com", {
  params: async (method, url, options) => {
    options.headers = options.headers || {};
    options.headers["Authorization"] = "Bearer " + getToken();
  },
  error: async (method, url, options, status) => {
    if (status === 401) {
      // logout
    }
  },
});

const cached = new HttpClient("https://api.example.com", {}, false, 60_000);
await cached.get("/users");
await cached.get("/users", { useCache: true });
await cached.clearCache("GET", "/users");`,
};

export const homeItems: HomeSectionItem[] = [
  {
    id: SectionIds["home-docs"],
    code: "",
  },
  {
    id: SectionIds["home-install"],
    code: CODE_README.install,
    lang: "bash",
  },
  {
    id: SectionIds["home-template-rx"],
    code: CODE_README.templateRx,
    component: DemoTemplateRxComponent,
  },
  {
    id: SectionIds["home-template-simple"],
    code: CODE_README.templateSimple,
    component: DemoTemplateSimpleComponent,
  },
  {
    id: SectionIds["home-template-rxfunc"],
    code: CODE_README.templateRxFunc,
    component: DemoTemplateRxFuncComponent,
  },
  {
    id: SectionIds["home-example-1"],
    code: CODE_README.example1,
    component: DemoComponent,
  },
  {
    id: SectionIds["home-example-2"],
    code: CODE_README.example2,
    component: DemoExpressionsComponent,
  },
  {
    id: SectionIds["home-scope"],
    code: CODE_README.example3,
    component: DemoBucketComponent,
  },
  {
    id: SectionIds["home-bootstrap"],
    code: CODE_README.bootstrap,
  },
  {
    id: SectionIds["home-router-code"],
    code: exampleRouterLoadResources,
    component: DemoRouterLazyComponent,
  },
  {
    id: SectionIds["home-http-code"],
    code: CODE_README.http,
  },
];
