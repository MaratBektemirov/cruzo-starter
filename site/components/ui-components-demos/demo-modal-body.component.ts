import { AbstractComponent, componentsRegistryService } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";
import { DEMO_MODAL_ID, demoModalScope } from "./demo-modal-scope";

export class DemoModalBodyComponent extends AbstractComponent {
  static selector = "demo-modal-body-component";

  close(isOK: boolean) {
    demoModalScope.bucket?.emitEvent(DEMO_MODAL_ID, "closeModal", { data: { isOK } });
  }

  getHTML() {
    return `<div>
        <h3 class="mb_s">Demo modal</h3>
        <p class="description-paragraph">
          Закройте окно кнопкой или кликом по фону.
        </p>
        <div class="mt_m">
          <button type="button" class="${UI_KIT}_button ${UI_KIT}_button-primary ${UI_KIT}_button-s mr_s" onclick="{{ root.close(true) }}">OK</button>
          <button type="button" class="${UI_KIT}_button ${UI_KIT}_button-s" onclick="{{ root.close(false) }}">Cancel</button>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoModalBodyComponent);
