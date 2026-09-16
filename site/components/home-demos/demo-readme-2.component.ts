import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import i18n from "./demo-readme-2.component.i18n.json"

export class DemoExpressionsComponent extends AbstractComponent {
  static selector = "demo-expressions-component";

  i18n$ = i18nService.connect(this, i18n);

  user$ = this.newRx({
    name: "John",
    tags: ["admin", "editor"],
    meta: { lastLogin: Date.now() },
  });

  upperTags(tags: string[]) {
    return tags?.map((t) => t.toUpperCase()).join(", ") ?? "-";
  }

  formatDate(ts: number | undefined) {
    return ts ? new Date(ts).toLocaleString() : "-";
  }

  isAdmin(tags: string[] | undefined) {
    return tags?.includes("admin") ?? false;
  }

  getHTML() {
    return `<div let-name="{{ root.user$::rx.name }}" let-tags="{{ root.user$::rx.tags }}">
        <div>
          {{ root.i18n$::rx.name }}: <b>{{ root.user$::rx.name ?? "Anonymous" }}</b>
        </div>
        <div class="mt_s">
          {{ root.i18n$::rx.tags }}: <b>{{ root.upperTags(root.user$::rx.tags) }}</b>
        </div>
        <div class="mt_s">
          {{ root.i18n$::rx.lastLogin }}: <b>{{ root.formatDate(root.user$::rx.meta?.lastLogin) }}</b>
        </div>
        <div class="mt_s">
          {{ root.i18n$::rx.role }}: <b>{{ root.isAdmin?.(root.user$::rx.tags) ? root.i18n$::rx.admin : root.i18n$::rx.user }}</b>
        </div>
        <div class="mt_s">
          {{ root.i18n$::rx.objectShorthand }}: <b>{{ ({ name, tags }).name }}</b>
        </div>
        <div class="mt_s">
          <span inner-html="{{ root.i18n$::rx.html }}"></span>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoExpressionsComponent);