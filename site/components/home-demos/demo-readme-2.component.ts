import { AbstractComponent, componentsRegistryService } from "cruzo"
import { langService } from "site/services/lang.service"
import i18n from "./demo-readme-2.component.i18n.json"

export class DemoExpressionsComponent extends AbstractComponent {
  static selector = "demo-expressions-component";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  user$ = this.newRx({
    name: "John",
    tags: ["admin", "editor"],
    meta: { lastLogin: Date.now() },
  });
  en_html$ = this.newRx("<b>bold</b>");
  ru_html$ = this.newRx("<b>Жирный</b>");

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
          {{ root.t$::rx?.name }}: <b>{{ root.user$::rx.name ?? "Anonymous" }}</b>
        </div>
        <div class="mt_s">
          {{ root.t$::rx?.tags }}: <b>{{ root.upperTags(root.user$::rx.tags) }}</b>
        </div>
        <div class="mt_s">
          {{ root.t$::rx?.lastLogin }}: <b>{{ root.formatDate(root.user$::rx.meta?.lastLogin) }}</b>
        </div>
        <div class="mt_s">
          {{ root.t$::rx?.role }}: <b>{{ root.isAdmin?.(root.user$::rx.tags) ? root.t$::rx?.admin : root.t$::rx?.user }}</b>
        </div>
        <div class="mt_s">
          {{ root.t$::rx?.objectShorthand }}: <b>{{ ({ name, tags }).name }}</b>
        </div>
        <div class="mt_s">
          <span inner-html="{{ root.lang$::rx === 'ru' ? root.ru_html$::rx : root.en_html$::rx }}"></span>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoExpressionsComponent);