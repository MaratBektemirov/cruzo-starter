import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import i18n from './demo-minimal-syntax.component.i18n.json'

export class DemoMinimalSyntaxComponent extends AbstractComponent {
  static selector = "demo-minimal-syntax-component";

  i18n$ = i18nService.connect(this, i18n);
  items$ = this.newRxFunc(
    (lang: string) => (lang === "ru" ? ["Один", "Два", "Три"] : ["One", "Two", "Three"]),
    i18nService.lang$,
  );

  getHTML() {
    return `<div>
        <div class="mb_s">
          <div repeat="{{ root.items$::rx }}">
            {{ root.items$::rx[index] }}
          </div>
        </div>
        <p>
          {{ root.i18n$::rx.text }}
        </p>
      </div>`;
  }
}

componentsRegistryService.define(DemoMinimalSyntaxComponent);
