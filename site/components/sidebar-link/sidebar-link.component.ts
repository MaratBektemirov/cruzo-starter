import styles from "./sidebar-link.component.module.css";

import { AbstractComponent, componentsRegistryService, routerService, RxBucket } from "cruzo";
import { SidebarSectionConfig, SidebarChild } from "site/components/sidebar/sidebar.component";
import { RouterLinkComponent, RouterLinkConfig } from "cruzo/ui-components/router-link";

export class SidebarLinkComponent extends AbstractComponent<
  any,
  SidebarSectionConfig
> {
  static selector = "sidebar-link-component";
  public dependencies = new Set([RouterLinkComponent.selector]);
  public hasOuterBucket = true;
  public activeChildrenForScrollSpy: SidebarChild = null;

  routerService = routerService;

  public innerBucket = new RxBucket({
    'router-link-main': {
      config: RouterLinkConfig({
        startsWith: true,
        ignoreHash: true,
        activeCls: styles["nav-button--active"],
      })
    },
    'router-link-children': {
      config: RouterLinkConfig({
        activeCls: styles["nav-child--active"],
        ignoreHash: true,
      })
    },
    'router-link-sub': {
      config: RouterLinkConfig({
        activeCls: styles["nav-subitem--active"],
      })
    },
  });

  linkState$ = this.newRxEventFromBucket(this.innerBucket, "router-link-main", "routerLinkStateChanged");
  activeChildrens$ = this.newRxEventFromBucketByIndex(this.innerBucket, "router-link-children", "routerLinkStateChanged");

  subMenuUpdateScheduled = false;

  public subMenu$ = this.newRxFunc(
    (activeChildrens, linkState, value) => {
      if (!value || !activeChildrens || this.subMenuUpdateScheduled) return;

      this.subMenuUpdateScheduled = true;

      queueMicrotask(() => {
        if (linkState?.data.isActive && value.children?.length) {
          const activeChildrenIndex = Object.keys(activeChildrens).find((v) => activeChildrens[v].data.isActive);

          const activeChildren = value.children[+activeChildrenIndex];

          if (activeChildren && activeChildren === this.activeChildrenForScrollSpy) {
            this.subMenuUpdateScheduled = false;
            return;
          };

          if (activeChildren?.sub?.length) {
            window.scrollTo(0, 0);

            const ids = activeChildren.sub.map((s) => s.id);

            if (this.activeChildrenForScrollSpy) this.removeScrollListeners();

            this.activeChildrenForScrollSpy = activeChildren;
            this.setupScrollSpy(ids);
          } else if (this.activeChildrenForScrollSpy) {
            this.removeScrollListeners();
          }
        } else if (this.activeChildrenForScrollSpy) {
          this.removeScrollListeners();
        }

        this.subMenuUpdateScheduled = false;
      });
    },
    this.activeChildrens$, this.linkState$, this.value$
  );

  getHTML() {
    return `<div let-link="{{ root.value$::rx }}">
        <a class="${styles["nav-button"]}"
          router-link
          component-id="router-link-main"
          bucket-id="${this.innerBucket.id}"
          href="{{ link?.path }}">
          {{ link?.title }}
        </a>

        <div
          class="${styles["nav-children"]}"
          attached="{{ root.linkState$::rx?.data?.isActive && link?.children?.length }}">
          <div repeat="{{ link?.children }}"
            let-children="{{ this }}"
            let-children-index="{{ index }}"
            class="${styles["nav-child-wrap"]}">
            <a class="${styles["nav-child"]}"
              router-link
              component-id="router-link-children"
              bucket-id="${this.innerBucket.id}"
              component-index="{{ index }}"
              href="{{ children?.path }}">
              {{ children?.title }}
            </a>
            <div class="${styles["nav-sub"]}"
              attached="{{ root.activeChildrens$::rx?.[childrenIndex]?.data?.isActive && this.sub?.length }}">
              <a
                repeat="{{ this.sub }}"
                router-link
                component-id="router-link-sub"
                bucket-id="${this.innerBucket.id}"
                component-index="{{ this.id }}"
                class="${styles["nav-subitem"]}"
                href="{{ children?.path+'#'+this.id }}"
                >
                <span class="${styles["nav-dot"]}"></span>
                <span>{{ this.title }}</span>
              </a>
            </div>
          </div>
        </div>

      </div>`;
  }

  private _onScroll: () => void = null;
  private _raf = 0;

  private setupScrollSpy(spyIds: string[]) {
    const getCurrentId = () => {
      const offset = 120;
      let bestId = spyIds[0];
      let bestTop = -Infinity;

      for (const id of spyIds) {
        const el = document.getElementById(id);
        if (!el) continue;

        const top = el.getBoundingClientRect().top - offset;
        if (top <= 0 && top > bestTop) {
          bestTop = top;
          bestId = id;
        }
      }

      if (bestTop === -Infinity) {
        let minAbs = Infinity;
        for (const id of spyIds) {
          const el = document.getElementById(id);
          if (!el) continue;
          const t = Math.abs(el.getBoundingClientRect().top - offset);
          if (t < minAbs) {
            minAbs = t;
            bestId = id;
          }
        }
      }

      return bestId;
    };

    const tick = () => {
      const id = getCurrentId();
      const nextHash = `#${id}`;

      if (window.location.hash === nextHash) return;

      // block auto-scroll briefly while hash is synced by scroll spy
      this.routerService.blockScrollToHashElement()();

      this.routerService.pushHistory(
        window.location.pathname + nextHash
      );
    };

    this._onScroll = () => {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = 0;
        tick();
      });
    };

    window.addEventListener("scroll", this._onScroll, { passive: true });
    window.addEventListener("resize", this._onScroll);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.removeScrollListeners();
  }

  removeScrollListeners() {
    if (!this.activeChildrenForScrollSpy) return;

    if (this._onScroll) {
      window.removeEventListener("scroll", this._onScroll);
      window.removeEventListener("resize", this._onScroll);
    }
    if (this._raf) cancelAnimationFrame(this._raf);

    this.activeChildrenForScrollSpy = null;
  }

  async connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(SidebarLinkComponent);
