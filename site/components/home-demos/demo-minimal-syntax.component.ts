import { AbstractComponent, componentsRegistryService } from "cruzo"
import { langService } from 'site/services/lang.service'
import i18n from './demo-minimal-syntax.component.i18n.json'

export class DemoMinimalSyntaxComponent extends AbstractComponent {
  static selector = "demo-minimal-syntax-component";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  ru_items$ = this.newRx(["Один", "Два", "Три"]);
  en_items$ = this.newRx(["One", "Two", "Three"]);

  getHTML() {
    return `<div>
        <div class="mb_s">
          <div repeat="{{ root.items$::rx }}">
            {{ root.lang$.actual === 'ru' ? root.ru_items$::rx[index] : root.en_items$::rx[index] }}
          </div>
        </div>
        <p>
          {{ root.t$::rx?.text }}
        </p>
      </div>`;
  }
}

componentsRegistryService.define(DemoMinimalSyntaxComponent);
