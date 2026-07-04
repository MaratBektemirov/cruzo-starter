import { AbstractComponent, componentsRegistryService } from "cruzo"
import { getTranslater } from 'site/utils/get-translater'
import i18n from './demo-simple.component.i18n.json'

export class DemoSimpleComponent extends AbstractComponent {
  static selector = "demo-simple-component";

  t$ = getTranslater(i18n, this)

  getHTML() {
    return `<div>
        <h3>{{ root.t$::rx?.title }}</h3>
        <p>{{ root.t$::rx?.text }}</p>
      </div>`;
  }
}

componentsRegistryService.define(DemoSimpleComponent);
