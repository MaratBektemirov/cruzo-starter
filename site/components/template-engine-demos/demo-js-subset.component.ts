import { AbstractComponent, componentsRegistryService } from "cruzo"
import { getTranslater } from 'site/utils/get-translater'
import i18n from "./demo-js-subset.component.i18n.json"

export class DemoJsSubsetComponent extends AbstractComponent {
  static selector = "demo-js-subset-component";

  user = this.newRx({
    name: "John",
    tags: ["admin", "editor"],
    meta: { lastLogin: Date.now() },
  });

  t$ = getTranslater(i18n, this)

  upperTags(tags: string[]) {
    return tags.map((t) => t.toUpperCase());
  }

  isAdmin(tags: string[]) {
    return tags.includes("admin");
  }

  formatDate(ts: number | null | undefined) {
    if (typeof ts !== "number") return "-";
    return new Date(ts).toLocaleString();
  }

  protected getHTML(): string {
    return `<div let-name="{{ root.user::rx.name }}" let-tags="{{ root.user::rx.tags }}">
        <div>
          {{ root.t$::rx?.name }}:
          <b>{{ root.user::rx.name ?? "Anonymous" }}</b>
        </div>

        <div class="mt_s">
          {{ root.t$::rx?.tags }}:
          <b>{{ root.upperTags(root.user::rx.tags ?? []).join(", ") }}</b>
        </div>

        <div class="mt_s">
          {{ root.t$::rx?.lastLogin }}:
          <b>{{ root.formatDate(root.user::rx.meta?.lastLogin) }}</b>
        </div>

        <div class="mt_s">
          {{ root.t$::rx?.role }}:
          <b>{{ root.isAdmin?.(root.user::rx.tags ?? []) ? "admin" : "user" }}</b>
        </div>

        <div class="mt_s">
          {{ root.t$::rx?.shorthand }}:
          <b>{{ ({ name, tags }).name }}</b>
        </div>

        <div class="mt_s">
          {{ root.t$::rx?.optionalCall }}:
          <b>{{ root.maybeFormat?.(root.user::rx.meta?.lastLogin) ?? root.t$::rx?.noFormatter }}</b>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoJsSubsetComponent);