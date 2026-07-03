import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from "site/services/lang.service"
import i18n from "./demo-modal-body.component.i18n.json"
import { DEMO_MODAL_ID, demoModalScope } from "./demo-modal-scope"

export class DemoModalBodyComponent extends AbstractComponent {
  static selector = "demo-modal-body-component";

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  close(isOK: boolean) {
    demoModalScope.bucket?.emitEvent(DEMO_MODAL_ID, "closeModal", { data: { isOK } });
  }

  getHTML() {
    return `<div>
        <h3 class="mb_s">{{ root.t$::rx.title }}</h3>

        <p class="description-paragraph">
          {{ root.t$::rx.description }}
        </p>

        <div class="mt_m">
          <button
            type="button"
            class="${UI_KIT}_button ${UI_KIT}_button-primary ${UI_KIT}_button-s mr_s"
            onclick="{{ root.close(true) }}"
          >{{ root.t$::rx.ok }}</button>

          <button
            type="button"
            class="${UI_KIT}_button ${UI_KIT}_button-s"
            onclick="{{ root.close(false) }}"
          >{{ root.t$::rx.cancel }}</button>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoModalBodyComponent);