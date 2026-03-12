import { AbstractComponent, AbstractComponentConstructor, componentsRegistryService, routerService, type Rx } from "cruzo";
import { createHighlighter, HighlighterGeneric } from "shiki";

import { appService } from "site/services/app.service";
import type { ComponentConnectedParams } from "cruzo";
import { DocsSectionItem, DocsSectionRouteData, SectionKey, SectionsData } from "site/urls";
import { SITE_SHIKI_LANGS } from "site/config/shiki-cruzo-languages";

export class DocsSectionComponent extends AbstractComponent<any, any> {
  static selector = "docs-section-component";
  highlighter: HighlighterGeneric<any, any> = null;

  items$ = this.newRx<DocsSectionItem[]>([]);
  dependencies = new Set<string>();

  codeHighlights: Record<string, string> = {};

  sections$ = appService.sections$;

  disconnectedCallback(): void {
    super.disconnectedCallback();

    if (this.highlighter) {
      this.highlighter.dispose();
    }
  }

  getHTML() {
    return `<div>
        <div repeat="{{ root.items$::rx }}" id="{{ this.id }}"
          let-desc-one="{{ root.sections$::rx[this.id].demos[1] }}"
          let-desc-two="{{ root.sections$::rx[this.id].demos[2] }}">
          <div class="description-0 mb_m"
            attached="{{ descOne }}"
            inner-html="{{ descOne }}"></div>
          <div class="fx fx-mobile-wrap mb_m">
            <div class="block block_example-left" attached="{{ this.component }}" inner-html="{{ root.getLeftBlockHTML(this.component) }}">
            </div>
            <div class="block block_example-right code-block_{{ this.id }}" inner-html="{{ root.codeHighlights[index] }}"></div>
          </div>
          <div class="description-1 mt_m"
            attached="{{ descTwo }}"
            inner-html="{{ descTwo }}"></div>
        </div>
      </div>`;
  }

  getLeftBlockHTML(cls: AbstractComponentConstructor | undefined) {
    return cls ? `<${cls.selector}></${cls.selector}>` : "";
  }

  updateCodeHighlights(items: DocsSectionItem[]) {
    this.codeHighlights = {};

    for (let index = 0; index < items.length; index++) {
      const html = this.highlighter.codeToHtml(items[index].code, {
        lang: "typescript",
        theme: "github-light",
      });

      this.codeHighlights[index] = `<div class="code-wrap">${html}</div>`;
    }
  }

  highlightApiExamples() {
    if (!this.highlighter || !this.template?.node) return;
    const root = this.template.node as HTMLElement;
    root.querySelectorAll(".api-example").forEach((el) => {
      const div = el as HTMLElement;
      const script = div.querySelector("script.api-example-code");
      const code = script
        ? (script as HTMLScriptElement).textContent?.trim()
        : (div.getAttribute("data-code") ?? "").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
      if (!code) return;
      const lang = (div.getAttribute("data-lang") || "typescript") as "typescript" | "bash";
      const html = this.highlighter.codeToHtml(code, { lang, theme: "github-light" });
      div.innerHTML = `<div class="block"><div class="code-wrap">${html}</div></div>`;
    });
  }

  async connectedCallback(params: ComponentConnectedParams) {
    this.highlighter = await createHighlighter({
      themes: ["github-light"],
      langs: SITE_SHIKI_LANGS as any,
    });

    this.newRxFunc(
      (routeParams: Record<string, string>) => {
        const sectionData: DocsSectionRouteData = SectionsData[routeParams.section as SectionKey];

        if (!sectionData) return;

        appService.currentSectionId$.update(sectionData.sectionId);
        this.updateCodeHighlights(sectionData.items);
        this.items$.update(sectionData.items);

        if (sectionData.dependencies) {
          this.addDependencies(sectionData.dependencies);
        }

        this.updateDependencies();

        setTimeout(() => this.highlightApiExamples(), 0);
      },
      params.routeParams$ as unknown as Rx<Record<string, string>>
    );

    super.connectedCallback(params);

    routerService.scrollToHashElement();
  }
}

componentsRegistryService.define(DocsSectionComponent);
