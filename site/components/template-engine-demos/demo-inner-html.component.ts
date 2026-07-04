import { AbstractComponent, componentsRegistryService } from "cruzo"
import { getTranslater } from 'site/utils/get-translater'
import i18n from "./demo-inner-html.component.i18n.json"

export class DemoInnerHtmlComponent extends AbstractComponent {
  static selector = "demo-inner-html-component";

  t$ = getTranslater(i18n, this)

  protected getHTML(): string {
    return `<div>
        <div class="mb_s">
          <span inner-html="{{ root.t$::rx?.html }}"></span>
        </div>
        <div class="mt_s">
          {{ root.t$::rx?.label }}: <code>{{ root.t$::rx?.html }}</code>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoInnerHtmlComponent);