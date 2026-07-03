import { AbstractComponent, componentsRegistryService } from "cruzo"
import { langService } from 'site/services/lang.service'
import i18n from './demo-simple.component.i18n.json'

export class DemoSimpleComponent extends AbstractComponent {
  static selector = "demo-simple-component";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  getHTML() {
    return `<div>
        <h3>{{ root.t$::rx?.title }}</h3>
        <p>{{ root.t$::rx?.text }}</p>
      </div>`;
  }
}

componentsRegistryService.define(DemoSimpleComponent);
