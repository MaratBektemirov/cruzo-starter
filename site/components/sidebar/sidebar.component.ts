import styles from "./sidebar.component.module.css";

import { AbstractComponent, componentsRegistryService, routerService } from "cruzo";
import { PixelReveal, type PixelRevealOptions } from "effect-tricks";

import { routerUrlBucket } from "site/urls";
import { RxBucket } from "cruzo";
import { SpinnerComponent, SpinnerConfig, SpinnerValue } from "cruzo/ui-components/spinner";
import { SidebarLinkComponent } from "site/components/sidebar-link/sidebar-link.component";
import { SectionIds } from "site/sections";
import { githubStarsService } from "site/services/github-stars.service";
import { HeroDotsCanvas } from "site/utils/hero-dots-canvas";

export interface SidebarSubSection {
  id: SectionIds;
  title: string;
  path?: string;
}

export interface SidebarChild {
  id: SectionIds;
  title: string;
  path: string;
  sub?: SidebarSubSection[];
}

export interface SidebarSectionConfig {
  id: SectionIds;
  title: string;
  path: string;
  children?: SidebarChild[];
  sub?: SidebarSubSection[];
}

const CRUZO_GITHUB_REPO = "https://github.com/MaratBektemirov/cruzo";
const LOGO_SRC = new URL("../../assets/logo.svg", import.meta.url).href;

const pixelRevealPreset = {
  colorFlash: true,
  pixelCount: 10,
  randomness: 0.12,
  direction: "top-left",
  duration: 2800,
  delay: 0,
  loop: false,
  flashColorMode: 'sample',
} satisfies PixelRevealOptions;

export const SIDEBAR_SECTIONS: SidebarSectionConfig[] = [
  {
    id: SectionIds.docs,
    title: "Docs",
    path: routerUrlBucket.buildUrl('docsDefault'),
    children: [
      {
        id: SectionIds["template-engine"],
        title: "Template",
        path: routerUrlBucket.buildUrl('docs', { section: SectionIds["template-engine"] }),
        sub: [
          { id: SectionIds["template-engine-rx"], title: "::rx" },
          { id: SectionIds["template-engine-js-subset"], title: "js-like expression subset" },
          { id: SectionIds["template-engine-attached"], title: "attached" },
          { id: SectionIds["template-engine-events"], title: "events" },
          { id: SectionIds["template-engine-let"], title: "let- variables" },
          { id: SectionIds["template-engine-inner-html"], title: "inner-html" },
          { id: SectionIds["template-engine-once"], title: "once::" },
          { id: SectionIds["template-engine-repeat"], title: "repeat" },
        ],
      },
      {
        id: SectionIds.router,
        title: "Router",
        path: routerUrlBucket.buildUrl('docs', { section: SectionIds.router }),
      },
      {
        id: SectionIds.http,
        title: "HTTP",
        path: routerUrlBucket.buildUrl('docs', { section: SectionIds.http }),
      },
      {
        id: SectionIds.component,
        title: "Component",
        path: routerUrlBucket.buildUrl('docs', { section: SectionIds.component }),
      },
      {
        id: SectionIds.service,
        title: "Service",
        path: routerUrlBucket.buildUrl('docs', { section: SectionIds.service }),
      },
      {
        id: SectionIds["cmp-interaction"],
        title: "RxBucket",
        path: routerUrlBucket.buildUrl('docs', { section: SectionIds["cmp-interaction"] }),
      },
      {
        id: SectionIds["ui-components"],
        title: "UI Components",
        path: routerUrlBucket.buildUrl('docs', { section: SectionIds["ui-components"] }),
        sub: [
          { id: SectionIds["ui-components-input"], title: "input" },
          { id: SectionIds["ui-components-textarea"], title: "textarea" },
          { id: SectionIds["ui-components-button-group"], title: "button-group" },
          { id: SectionIds["ui-components-upload"], title: "upload" },
          { id: SectionIds["ui-components-select"], title: "select" },
          { id: SectionIds["ui-components-spinner"], title: "spinner" },
          { id: SectionIds["ui-components-modal"], title: "modal" },
          { id: SectionIds["ui-components-toast"], title: "toast" },
          { id: SectionIds["ui-components-css-classes"], title: "CSS классы" },
        ],
      },
    ],
  },
  {
    id: SectionIds.tests,
    title: "Tests",
    path: routerUrlBucket.buildUrl('tests'),
    sub: [
      {
        id: SectionIds["benchmark-grid"],
        title: "grid",
      },
      {
        id: SectionIds["tests-text"],
        title: "text",
      },
      {
        id: SectionIds["tests-list"],
        title: "list",
      },
      {
        id: SectionIds["tests-mount"],
        title: "mount/unmount",
      },
      {
        id: SectionIds["tests-events"],
        title: "events",
      },
      {
        id: SectionIds["tests-empty"],
        title: "empty repeat",
      },
      {
        id: SectionIds["tests-null"],
        title: "null/undefined",
      },
      {
        id: SectionIds["tests-conditional"],
        title: "conditional",
      },
      {
        id: SectionIds["tests-nested"],
        title: "nested Rx",
      },
    ],
  },
  {
    id: SectionIds.web3,
    title: "Web3",
    path: routerUrlBucket.buildUrl("web3Default"),
    children: [
      {
        id: SectionIds["web3-intro"],
        title: "Overview",
        path: routerUrlBucket.buildUrl("web3Overview"),
      },
      {
        id: SectionIds["web3-sign"],
        title: "Sign",
        path: routerUrlBucket.buildUrl("web3Sign"),
      },
    ],
  },
];

export class SidebarComponent extends AbstractComponent {
  static selector = "sidebar-component";
  public dependencies = new Set([SidebarLinkComponent.selector, SpinnerComponent.selector]);

  public innerBucket = new RxBucket({
    link: {},
    githubStars: { config: SpinnerConfig({ size: "4px" }) },
  });

  sections = this.newRx(SIDEBAR_SECTIONS);
  githubStars$ = this.newRxFunc(
    (count) => (count == null ? "" : String(count)),
    githubStarsService.count$,
  );
  githubStarsLoading$ = githubStarsService.loading$;

  routerService = routerService;

  private logoReveal?: PixelReveal;
  private logoStars?: HeroDotsCanvas;
  private logoStarsMountRaf = 0;

  disconnectedCallback(): void {
    this.logoReveal?.destroy();
    this.logoReveal = undefined;
    cancelAnimationFrame(this.logoStarsMountRaf);
    this.logoStarsMountRaf = 0;
    this.logoStars?.destroy();
    this.logoStars = undefined;
    super.disconnectedCallback();
  }

  getHTML() {
    return `<aside class="${styles.sidebar}">
        <div class="${styles["logo-row"]}">
          <div class="${styles["logo-stars-wrap"]}" aria-hidden="true">
            <canvas class="${styles["logo-stars"]}"></canvas>
          </div>
          <a router-link href="${routerUrlBucket.buildUrl('main')}" class="${styles.logo}" style="text-decoration: none; color: inherit; cursor: pointer;">
            <div class="${styles["logo-mark"]}">
              <canvas class="${styles["logo-canvas"]}"></canvas>
            </div>
            <div>
              <div>Cruzo</div>
              <div style="font-size:11px; text-transform:none; letter-spacing:0; color:var(--text-muted);">
                tech minimalistic and intuitive framework with an expression VM.
              </div>
            </div>
          </a>
          <a
            class="${styles["github-star"]}"
            href="${CRUZO_GITHUB_REPO}"
            target="_blank"
            rel="noopener noreferrer"
            title="Star cruzo on GitHub"
            aria-label="Star cruzo on GitHub">
            <svg class="${styles["github-star-icon"]}" viewBox="0 0 16 16" aria-hidden="true">
              <path fill="currentColor" d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/>
            </svg>
            <span class="${styles["github-star-label"]}">Star</span>
            <span
              class="${styles["github-star-spinner"]}"
              is="spinner"
              component-id="githubStars"
              bucket-id="${this.innerBucket.id}"
              attached="{{ root.githubStarsLoading$::rx }}"></span>
            <span
              class="${styles["github-star-count"]}"
              attached="{{ !root.githubStarsLoading$::rx }}">{{ root.githubStars$::rx }}</span>
          </a>
        </div>

        <div style="overflow-x: auto;">
          <nav class="${styles.nav}">
            <sidebar-link-component
              repeat="{{ root.sections::rx }}"
              component-id="link"
              component-index="{{ index }}"
              bucket-id="${this.innerBucket.id}"></sidebar-link-component>
          </nav>
        </div>

        <div class="${styles["starter-actions"]}">
          <a
            class="${styles["starter-action-link"]}"
            href="https://github.com/MaratBektemirov/cruzo-starter"
            target="_blank"
            rel="noopener noreferrer">
            Starter repo
          </a>
          <a
            class="${styles["starter-action-link"]}"
            href="vscode://vscode.git/clone?url=https://github.com/MaratBektemirov/cruzo-starter">
            Open starter in VS Code
          </a>
        </div>

        <div class="sidebar-footer">
        </div>
      </aside>`;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.innerBucket.setValues({
      link: Object.fromEntries(SIDEBAR_SECTIONS.map((s, i) => [String(i), s])),
    });

    this.newRxFunc((loading) => {
      this.innerBucket.setValue(
        "githubStars",
        loading ? SpinnerValue.active : SpinnerValue.inactive,
      );
    }, githubStarsService.loading$);

    this.newRxFunc((count) => {
      if (count == null) return;
      this.logoStars?.setStarCount(count);
    }, githubStarsService.count$);

    this.newRxFunc((logins) => {
      this.logoStars?.setStargazers(logins ?? []);
    }, githubStarsService.stargazers$);

    requestAnimationFrame(() => {
      this.initLogoReveal();
      this.scheduleMountLogoStars();
    });
  }

  private scheduleMountLogoStars() {
    cancelAnimationFrame(this.logoStarsMountRaf);
    this.logoStarsMountRaf = requestAnimationFrame(() => this.mountLogoStars());
  }

  private mountLogoStars() {
    this.logoStarsMountRaf = 0;
    if (this.logoStars || !this.template?.node) return;

    const canvas = this.template.node.querySelector<HTMLCanvasElement>(`.${styles["logo-stars"]}`);
    if (!canvas || !canvas.isConnected) {
      this.scheduleMountLogoStars();
      return;
    }

    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) {
      this.scheduleMountLogoStars();
      return;
    }

    const eventRoot = canvas.parentElement?.parentElement ?? canvas.parentElement ?? canvas;

    this.logoStars = new HeroDotsCanvas(
      canvas,
      githubStarsService.count$.actual ?? 0,
      eventRoot,
    );
    this.logoStars.setStargazers(githubStarsService.stargazers$.actual ?? []);
  }

  private initLogoReveal() {
    const canvas = this.template.node.querySelector<HTMLCanvasElement>(`.${styles["logo-canvas"]}`);
    if (!canvas || this.logoReveal) return;

    this.logoReveal = new PixelReveal(canvas, LOGO_SRC, {
      ...pixelRevealPreset,
    });
  }
}

componentsRegistryService.define(SidebarComponent);
