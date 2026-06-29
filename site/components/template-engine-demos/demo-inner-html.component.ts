import { AbstractComponent, componentsRegistryService } from "cruzo"
import { langService } from 'site/services/lang.service'

export class DemoInnerHtmlComponent extends AbstractComponent {
  static selector = "demo-inner-html-component";

  html_ru = this.newRx("<b>Жирный</b> и <em>курсив</em>");
  html_en = this.newRx("<b>Bold</b> and <em>italic</em>");

  lang$ = this.newRxFunc(
    () => langService.lang$.actual,
    langService.lang$
  );

  protected getHTML(): string {
    return `<div>
        <div class="mb_s">
          <span inner-html="{{ root.lang$::rx === 'ru' ? root.html_ru::rx : root.html_en::rx }}"></span>
        </div>
        <div class="mt_s">
          html: <code>{{ root.lang$::rx === 'ru' ? root.html_ru::rx : root.html_en::rx }}</code>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoInnerHtmlComponent);
