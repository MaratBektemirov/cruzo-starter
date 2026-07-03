import { AbstractComponent, componentsRegistryService } from "cruzo"
import { langService } from "site/services/lang.service"
import i18n from "./demo-inner-html.component.i18n.json"

export class DemoInnerHtmlComponent extends AbstractComponent {
  static selector = "demo-inner-html-component";

  i18n = i18n;
  lang$ = this.newRxFunc(
    () => langService.lang$.actual,
    langService.lang$
  );
  t$ = this.newRxFunc(
    (lang) => this.i18n[lang],
    this.lang$
  );

  protected getHTML(): string {
    return `<div>
        <div class="mb_s">
          <span inner-html="{{ root.t$::rx.html }}"></span>
        </div>
        <div class="mt_s">
          {{ root.t$::rx.label }}: <code>{{ root.t$::rx.html }}</code>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoInnerHtmlComponent);