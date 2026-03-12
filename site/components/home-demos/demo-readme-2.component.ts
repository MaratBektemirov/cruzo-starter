import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoExpressionsComponent extends AbstractComponent {
  static selector = "demo-expressions-component";

  user$ = this.newRx({
    name: "John",
    tags: ["admin", "editor"],
    meta: { lastLogin: Date.now() },
  });
  html$ = this.newRx("<b>bold</b>");

  upperTags(tags: string[]) {
    return tags?.map((t) => t.toUpperCase()).join(", ") ?? "-";
  }
  formatDate(ts: number | undefined) {
    return ts ? new Date(ts).toLocaleString() : "-";
  }

  getHTML() {
    return `<div let-name="{{ root.user$::rx.name }}" let-tags="{{ root.user$::rx.tags }}">
        <div>
          Name: <b>{{ root.user$::rx.name ?? "Anonymous" }}</b>
        </div>
        <div class="mt_s">
          Tags: <b>{{ root.upperTags(root.user$::rx.tags) }}</b>
        </div>
        <div class="mt_s">
          Last login: <b>{{ root.formatDate(root.user$::rx.meta?.lastLogin) }}</b>
        </div>
        <div class="mt_s">
          Role: <b>{{ root.isAdmin?.(root.user$::rx.tags) ? "admin" : "user" }}</b>
        </div>
        <div class="mt_s">
          Object shorthand: <b>{{ ({ name, tags }).name }}</b>
        </div>
        <div class="mt_s">
          <span inner-html="{{ root.html$::rx }}"></span>
        </div>
      </div>`;
  }
  isAdmin(tags: string[] | undefined) {
    return tags?.includes("admin") ?? false;
  }
}

componentsRegistryService.define(DemoExpressionsComponent);
