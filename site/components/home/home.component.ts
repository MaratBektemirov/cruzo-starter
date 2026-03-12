import { AbstractComponent, AbstractComponentConstructor, componentsRegistryService } from "cruzo";
import { createHighlighter, HighlighterGeneric } from "shiki";

import { appService } from "site/services/app.service";
import { SectionIds } from "site/sections";
import { homeItems, type HomeSectionItem } from "site/content/home-section-data";
import { SITE_SHIKI_LANGS } from "site/config/shiki-cruzo-languages";

export class HomeComponent extends AbstractComponent {
  static selector = "home-component";
  highlighter: HighlighterGeneric<any, any> = null;

  items$ = this.newRx<HomeSectionItem[]>([]);
  dependencies = new Set<string>();

  codeHighlights: Record<number, string> = {};
  sections$ = appService.sections$;

  disconnectedCallback(): void {
    super.disconnectedCallback();
    if (this.highlighter) {
      this.highlighter.dispose();
    }
  }

  getHTML() {
    return `<div class="home-content">
        <div class="home-intro">
          <div repeat="{{ root.items$::rx }}" id="{{ this.id }}"
            let-desc-one="{{ root.sections$::rx[this.id].demos[1] }}"
            let-desc-two="{{ root.sections$::rx[this.id].demos[2] }}"
            let-has-code="{{ root.codeHighlights[index] }}">
            <div class="description-0 mb_m"
              attached="{{ descOne }}"
              inner-html="{{ descOne }}"></div>
            <div class="fx fx-mobile-wrap mb_m"
              attached="{{ this.component || hasCode }}">
              <div class="block block_example-left" attached="{{ this.component }}" inner-html="{{ root.getLeftBlockHTML(this.component) }}">
              </div>
              <div class="block block_example-right code-block_{{ this.id }}" attached="{{ hasCode }}" inner-html="{{ hasCode }}"></div>
            </div>
            <div class="description-1 mt_m"
              attached="{{ descTwo }}"
              inner-html="{{ descTwo }}"></div>
          </div>
        </div>
      </div>`;
  }

  getLeftBlockHTML(cls: AbstractComponentConstructor | undefined) {
    return cls ? `<${cls.selector}></${cls.selector}>` : "";
  }

  updateCodeHighlights(items: HomeSectionItem[]) {
    this.codeHighlights = {};

    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      if (!item.code) continue;

      const lang = item.lang ?? "typescript";
      const html = this.highlighter.codeToHtml(item.code, {
        lang,
        theme: "github-light",
      });

      this.codeHighlights[index] = `<div class="code-wrap">${html}</div>`;
    }
  }

  async connectedCallback() {
    appService.currentSectionId$.update(SectionIds.home);

    this.highlighter = await createHighlighter({
      themes: ["github-light"],
      langs: SITE_SHIKI_LANGS as any,
    });

    this.updateCodeHighlights(homeItems);
    this.items$.update(homeItems);

    for (const item of homeItems) {
      if (item.component) {
        this.dependencies.add(item.component.selector);
      }
    }
    this.dependencies.add("input-component");
    this.dependencies.add("button-group-component");
    this.updateDependencies();

    super.connectedCallback();
  }
}

componentsRegistryService.define(HomeComponent);
