import { AbstractComponent, componentsRegistryService, routerService, type Rx } from "cruzo";
import { createHighlighter, HighlighterGeneric } from "shiki";

import { appService } from "site/services/app.service";

import { DemoGridBench } from "site/components/bench-demos/demo-grid-bench.component";
import DemoGridBenchCode from "site/components/bench-demos/demo-grid-bench.component?raw";
import { DemoTextBench } from "site/components/bench-demos/demo-text-bench.component";
import DemoTextBenchCode from "site/components/bench-demos/demo-text-bench.component?raw";
import { DemoListBench } from "site/components/bench-demos/demo-list-bench.component";
import DemoListBenchCode from "site/components/bench-demos/demo-list-bench.component?raw";
import { DemoMountBench } from "site/components/bench-demos/demo-mount-bench.component";
import DemoMountBenchCode from "site/components/bench-demos/demo-mount-bench.component?raw";
import { DemoEventsBench } from "site/components/bench-demos/demo-events-bench.component";
import DemoEventsBenchCode from "site/components/bench-demos/demo-events-bench.component?raw";
import { DemoEmptyRepeat } from "site/components/bench-demos/demo-empty-repeat.component";
import DemoEmptyRepeatCode from "site/components/bench-demos/demo-empty-repeat.component?raw";
import { DemoNullUndefined } from "site/components/bench-demos/demo-null-undefined.component";
import DemoNullUndefinedCode from "site/components/bench-demos/demo-null-undefined.component?raw";
import { DemoConditional } from "site/components/bench-demos/demo-conditional.component";
import DemoConditionalCode from "site/components/bench-demos/demo-conditional.component?raw";
import { DemoNestedRx } from "site/components/bench-demos/demo-nested-rx.component";
import DemoNestedRxCode from "site/components/bench-demos/demo-nested-rx.component?raw";
import { SectionIds } from "site/sections";
import { SITE_SHIKI_LANGS } from "site/config/shiki-cruzo-languages";
import { scrollToSectionFromSearch } from "site/section-scroll";

export class TestsComponent extends AbstractComponent {
  routerService = routerService;

  static selector = "tests-component";
  highlighter: HighlighterGeneric<any, any> = null;

  private demoInstancesBySelector: Record<string, AbstractComponent<any, any>[]> = {};
  private demoInstancesBySelector$ = this.newRx(this.demoInstancesBySelector);

  public dependencies = new Set([
    DemoGridBench.selector,
    DemoTextBench.selector,
    DemoListBench.selector,
    DemoMountBench.selector,
    DemoEventsBench.selector,
    DemoEmptyRepeat.selector,
    DemoNullUndefined.selector,
    DemoConditional.selector,
    DemoNestedRx.selector,
  ]);

  demoComponents = [
    { code: DemoGridBenchCode, component: DemoGridBench, id: SectionIds["benchmark-grid"] },
    { code: DemoTextBenchCode, component: DemoTextBench, id: SectionIds["tests-text"] },
    { code: DemoListBenchCode, component: DemoListBench, id: SectionIds["tests-list"] },
    { code: DemoMountBenchCode, component: DemoMountBench, id: SectionIds["tests-mount"] },
    { code: DemoEventsBenchCode, component: DemoEventsBench, id: SectionIds["tests-events"] },
    { code: DemoEmptyRepeatCode, component: DemoEmptyRepeat, id: SectionIds["tests-empty"] },
    { code: DemoNullUndefinedCode, component: DemoNullUndefined, id: SectionIds["tests-null"] },
    { code: DemoConditionalCode, component: DemoConditional, id: SectionIds["tests-conditional"] },
    { code: DemoNestedRxCode, component: DemoNestedRx, id: SectionIds["tests-nested"] },
  ];

  codeHighlights: Record<string, string> = {};

  sections$ = appService.sections$;
  section$ = appService.section$;

  disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.highlighter) {
      this.highlighter.dispose();
    }
  }

  getHTML() {
    const introId = SectionIds["tests-intro"];
    const testsPageId = SectionIds.tests;
    return `<div let-intro="{{ once::root.sections$::rx['${introId}'].demos[1] }}" let-labels="{{ root.sections$::rx['${testsPageId}']?.labels }}">
        <div class="tests-intro mb_xl"
          attached="{{ intro }}"
          inner-html="{{ intro }}"></div>
        <div repeat="{{ root.demoComponents }}" id="{{ once::this.id }}"
          let-sel="{{ once::this.component.selector }}"
          let-desc-one="{{ once::root.sections$::rx[this.id].demos[1] }}"
          let-desc-two="{{ once::root.sections$::rx[this.id].demos[2] }}">
          <div class="description-0 mb_m"
            attached="{{ descOne }}"
            inner-html="{{ descOne }}"></div>
          <div class="fx fx-mobile-wrap mb_m">
            <div class="block block_example-left block_example-scroll">
              <div class="fx fx-gap mb_s" let-is-connected="{{ root.demoInstancesBySelector$::rx[sel]?.length }}">
                <button
                  attached="{{ !isConnected }}"
                  class="cruzo-ui-component_button cruzo-ui-component_button-s cruzo-ui-component_button-primary tests-run mr_s"
                  onclick="{{ root.mountDemo(sel) }}">{{ labels?.run }}</button>
                <button
                  attached="{{ isConnected }}"
                  class="cruzo-ui-component_button cruzo-ui-component_button-s cruzo-ui-component_button-secondary tests-destroy"
                  onclick="{{ root.destroyDemo(sel) }}">{{ labels?.destroy }}</button>
              </div>
              <div class="tests-demo-host" data-demo-host="{{ sel }}"></div>
            </div>
            <div class="block block_example-right code-block_{{ sel }}" inner-html="{{ once::root.codeHighlights[index] }}"></div>
          </div>
          <div class="description-1 mt_m"
            attached="{{ descTwo }}"
            inner-html="{{ descTwo }}"></div>
        </div>
      </div>`;
  }

  mountDemo(selector: string) {
    if (this.demoInstancesBySelector[selector]?.length) return;

    const host = this.node?.querySelector(
      `.tests-demo-host[data-demo-host="${selector}"]`
    ) as HTMLElement;

    host.innerHTML = `<${selector}></${selector}>`;

    this.demoInstancesBySelector[selector] ??= [];
    this.demoInstancesBySelector[selector].push(this.connectDependency(selector)[0]);
    this.demoInstancesBySelector$.update(this.demoInstancesBySelector);
  }

  destroyDemo(selector: string) {
    const list = this.demoInstancesBySelector[selector];
    const index = this.connectedDependencies.indexOf(list[0]);
    this.connectedDependencies.splice(index, 1);

    componentsRegistryService.removeComponents(list);
    list.length = 0;

    const host = this.node?.querySelector(
      `.tests-demo-host[data-demo-host="${selector}"]`
    ) as HTMLElement;

    if (host) host.innerHTML = "";

    this.demoInstancesBySelector$.update(this.demoInstancesBySelector);
  }

  async connectedCallback() {
    appService.currentSectionId$.update(SectionIds.tests);

    this.highlighter = await createHighlighter({
      themes: ["github-light"],
      langs: SITE_SHIKI_LANGS as any,
    });

    for (let index = 0; index < this.demoComponents.length; index++) {
      const html = this.highlighter.codeToHtml(this.demoComponents[index].code, {
        lang: "typescript",
        theme: "github-light",
      });

      this.codeHighlights[index] = `<div class="code-wrap">${html}</div>`;
    }

    super.connectedCallback();

    this.newRxFunc((search) => {
      scrollToSectionFromSearch(search);
    }, this.routerService.search$);
  }
}

componentsRegistryService.define(TestsComponent);
