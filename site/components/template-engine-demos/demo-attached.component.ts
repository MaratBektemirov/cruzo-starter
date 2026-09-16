import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from "./demo-attached.component.i18n.json"

export class DemoAttachedComponent extends AbstractComponent {
  static selector = "demo-attached-component";

  open = this.newRx(true);
  i18n$ = i18nService.connect(this, i18n);

  protected getHTML(): string {
    return `<div>
        <button class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary" onclick="{{ root.open.update(!root.open::rx) }}">
          {{ root.i18n$::rx.toggle }}
        </button>

        <div attached="{{ root.open::rx }}" class="description-note">
          {{ root.i18n$::rx.note }} <code class="description-inline-code">open === true</code>
        </div>

        <div class="mt_s">
          open: <b>{{ root.open::rx }}</b>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoAttachedComponent);