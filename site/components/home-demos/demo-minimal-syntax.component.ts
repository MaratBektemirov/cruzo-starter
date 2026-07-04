import { AbstractComponent, componentsRegistryService } from "cruzo"
import { getTranslater } from 'site/utils/get-translater'
import i18n from './demo-minimal-syntax.component.i18n.json'

export class DemoMinimalSyntaxComponent extends AbstractComponent {
  static selector = "demo-minimal-syntax-component";

  t$ = getTranslater(i18n, this)

  getHTML() {
    return `<div>
        <div class="mb_s">
          <div repeat="{{ root.t$::rx?.items }}">
            {{ root.t$::rx?.items[index] }}
          </div>
        </div>
        <p>
          {{ root.t$::rx?.text }}
        </p>
      </div>`;
  }
}

componentsRegistryService.define(DemoMinimalSyntaxComponent);
