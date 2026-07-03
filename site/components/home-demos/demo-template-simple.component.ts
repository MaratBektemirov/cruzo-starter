import { AbstractComponent, componentsRegistryService } from "cruzo"
import { langService } from 'site/services/lang.service'
import i18n from './demo-template-simple.component.i18n.json'

export class DemoTemplateSimpleComponent extends AbstractComponent {
  static selector = "demo-template-simple-component";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  en_name = "World";
  ru_name = "Мир";

  getHTML() {
    return `<div class="mt_s">{{ root.t$::rx?.hello }}, <b>{{ root.lang$::rx === 'ru' ? root.ru_name : root.en_name }}</b></div>`;
  }
}

componentsRegistryService.define(DemoTemplateSimpleComponent);
