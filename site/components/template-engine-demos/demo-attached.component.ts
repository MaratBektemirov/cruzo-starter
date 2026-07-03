import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from "site/services/lang.service"
import i18n from "./demo-attached.component.i18n.json"

export class DemoAttachedComponent extends AbstractComponent {
  static selector = "demo-attached-component";

  open = this.newRx(true);
  i18n = i18n;

  lang$ = this.newRxFunc(
    () => langService.lang$.actual,
    langService.lang$
  );

  t$ = this.newRxFunc(
    (lang) => this.i18n[lang],
    this.lang$
  );

  protected getHTML(): string {
    return `<div>
        <button class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary" onclick="{{ root.open.update(!root.open::rx) }}">
          {{ root.t$::rx.toggle }}
        </button>

        <div attached="{{ root.open::rx }}" class="description-note">
          {{ root.t$::rx.note }} <code class="description-inline-code">open === true</code>
        </div>

        <div class="mt_s">
          open: <b>{{ root.open::rx }}</b>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoAttachedComponent);