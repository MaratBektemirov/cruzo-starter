import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoInnerHtmlComponent extends AbstractComponent {
  static selector = "demo-inner-html-component";

  html = this.newRx("<b>Жирный</b> и <em>курсив</em>");

  protected getHTML(): string {
    return `<div>
        <div class="mb_s">
          <span inner-html="{{ root.html::rx }}"></span>
        </div>
        <div class="mt_s">
          html: <code>{{ root.html::rx }}</code>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoInnerHtmlComponent);
