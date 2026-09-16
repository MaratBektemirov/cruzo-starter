import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import i18n from "./demo-inner-html.component.i18n.json"

export class DemoInnerHtmlComponent extends AbstractComponent {
  static selector = "demo-inner-html-component";

  i18n$ = i18nService.connect(this, i18n);

  protected getHTML(): string {
    return `<div>
        <div class="mb_s">
          <span inner-html="{{ root.i18n$::rx.html }}"></span>
        </div>
        <div class="mt_s">
          {{ root.i18n$::rx.label }}: <code>{{ root.i18n$::rx.html }}</code>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoInnerHtmlComponent);