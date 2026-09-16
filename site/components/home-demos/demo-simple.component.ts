import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import i18n from './demo-simple.component.i18n.json'

export class DemoSimpleComponent extends AbstractComponent {
  static selector = "demo-simple-component";

  i18n$ = i18nService.connect(this, i18n);

  getHTML() {
    return `<div>
        <h3>{{ root.i18n$::rx.title }}</h3>
        <p>{{ root.i18n$::rx.text }}</p>
      </div>`;
  }
}

componentsRegistryService.define(DemoSimpleComponent);
