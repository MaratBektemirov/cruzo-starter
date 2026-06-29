import { AbstractComponent, componentsRegistryService, routerService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"

import { LangSwitchComponent } from "site/components/lang/lang-switch.component"
import { SectionIds } from "site/sections"
import { appService } from "site/services/app.service"
import { routerUrlBucket } from "site/urls"
import { buildBreadcrumbs, type Breadcrumb } from "site/utils/docs-breadcrumbs"

const CRUZO_GITHUB_REPO = "https://github.com/MaratBektemirov/cruzo";

export class HeaderComponent extends AbstractComponent {
  static selector = "header-component";

  section$ = appService.section$;
  sections$ = appService.sections$;
  currentSectionId$ = appService.currentSectionId$;
  breadcrumbs$ = this.newRx<Breadcrumb[]>([]);
  homeId = SectionIds.home;
  docsUrl = routerUrlBucket.buildUrl("docsDefault");
  githubUrl = CRUZO_GITHUB_REPO;

  dependencies = new Set([LangSwitchComponent.selector]);

  labels$ = this.newRxFunc(
    (section) => section?.labels ?? {},
    appService.section$
  );

  getHTML() {
    return `<header style="width: 100%;">
      <div let-section="{{ this.section$::rx }}" let-is-home="{{ root.currentSectionId$::rx === root.homeId }}">
        <section class="home-hero" attached="{{ isHome }}">
          <div class="home-hero__title-row">
            <h1 class="home-hero__title">{{ section?.title }}</h1>
            <lang-switch-component></lang-switch-component>
          </div>
          <div class="home-hero__content">
            <div class="home-hero__subtitle" inner-html="{{ section?.description }}"></div>
            <div class="home-hero__actions">
              <a
                router-link
                class="${UI_KIT}_button ${UI_KIT}_button-m ${UI_KIT}_button-primary"
                href="${this.docsUrl}">{{ root.labels$::rx.start }}</a>
              <a
                class="${UI_KIT}_button ${UI_KIT}_button-m ${UI_KIT}_button-secondary"
                href="${this.githubUrl}"
                target="_blank"
                rel="noopener noreferrer">GitHub</a>
            </div>
            <p class="home-hero__tags">{{ root.labels$::rx.bundleSize }}</p>
          </div>
        </section>

        <div attached="{{ !isHome && section }}">
          <nav class="docs-breadcrumbs" attached="{{ root.breadcrumbs$::rx.length > 1 }}" aria-label="Breadcrumb">
            <ol class="docs-breadcrumbs__list">
              <li repeat="{{ root.breadcrumbs$::rx }}" class="docs-breadcrumbs__item">
                <span class="docs-breadcrumbs__sep" attached="{{ index > 0 }}">/</span>
                <a router-link class="docs-breadcrumbs__link" href="{{ this.href }}" attached="{{ this.href }}">{{ this.label }}</a>
                <span class="docs-breadcrumbs__current" attached="{{ !this.href }}">{{ this.label }}</span>
              </li>
            </ol>
          </nav>
          <h1 class="mt_l">{{ section?.title }}</h1>
          <span class="header__description" inner-html="{{ section?.description }}"></span>
        </div>
      </div>
    </header>`;
  }

  async connectedCallback() {
    this.newRxFunc((pathname, sections) => {
      this.breadcrumbs$.update(buildBreadcrumbs(pathname, sections));
    }, routerService.pathname$, this.sections$);

    await super.connectedCallback();
  }
}

componentsRegistryService.define(HeaderComponent);