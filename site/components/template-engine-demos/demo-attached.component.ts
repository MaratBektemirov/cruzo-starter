import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { getTranslater } from 'site/utils/get-translater'
import i18n from "./demo-attached.component.i18n.json"

export class DemoAttachedComponent extends AbstractComponent {
  static selector = "demo-attached-component";

  open = this.newRx(true);
  t$ = getTranslater(i18n, this)

  protected getHTML(): string {
    return `<div>
        <button class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary" onclick="{{ root.open.update(!root.open::rx) }}">
          {{ root.t$::rx?.toggle }}
        </button>

        <div attached="{{ root.open::rx }}" class="description-note">
          {{ root.t$::rx?.note }} <code class="description-inline-code">open === true</code>
        </div>

        <div class="mt_s">
          open: <b>{{ root.open::rx }}</b>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoAttachedComponent);