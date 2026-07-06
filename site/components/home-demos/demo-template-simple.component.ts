import { AbstractComponent, componentsRegistryService } from "cruzo"
import { getTranslater } from 'site/utils/get-translater'
import i18n from './demo-template-simple.component.i18n.json'

export class DemoTemplateSimpleComponent extends AbstractComponent {
  static selector = "demo-template-simple-component";

  t$ = getTranslater(i18n, this)

  getHTML() {
    return `<div class="mt_s">{{ root.t$::rx?.hello }}, <b>{{ root.t$::rx?.name }}</b></div>`;
  }
}

componentsRegistryService.define(DemoTemplateSimpleComponent);
