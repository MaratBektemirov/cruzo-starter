import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoJsSubsetComponent extends AbstractComponent {
  static selector = "demo-js-subset-component";

  user = this.newRx({
    name: "John",
    tags: ["admin", "editor"],
    meta: { lastLogin: Date.now() },
  });

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
          Name:
          <b>{{ root.user::rx.name ?? "Anonymous" }}</b>
        </div>

        <div class="mt_s">
          Tags:
          <b>{{ root.upperTags(root.user::rx.tags ?? []).join(", ") }}</b>
        </div>

        <div class="mt_s">
          Last login:
          <b>{{ root.formatDate(root.user::rx.meta?.lastLogin) }}</b>
        </div>

        <div class="mt_s">
          Role:
          <b>{{ root.isAdmin?.(root.user::rx.tags ?? []) ? "admin" : "user" }}</b>
        </div>

        <div class="mt_s">
          Object shorthand:
          <b>{{ ({ name, tags }).name }}</b>
        </div>

        <div class="mt_s">
          Optional call:
          <b>{{ root.maybeFormat?.(root.user::rx.meta?.lastLogin) ?? "no formatter" }}</b>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoJsSubsetComponent);
