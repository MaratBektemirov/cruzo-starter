import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import i18n from './demo-template-simple.component.i18n.json'

export class DemoTemplateSimpleComponent extends AbstractComponent {
  static selector = "demo-template-simple-component";

  i18n$ = i18nService.connect(this, i18n);

  getHTML() {
    return `<div class="mt_s">{{ root.i18n$::rx.hello }}, <b>{{ root.i18n$::rx.name }}</b></div>`;
  }
}

componentsRegistryService.define(DemoTemplateSimpleComponent);
