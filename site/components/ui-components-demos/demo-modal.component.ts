import { AbstractComponent, componentsRegistryService, RxScope } from "cruzo";
import { ModalComponent, ModalConfig } from "cruzo/ui-components/modal";

export class DemoModalScopeComponent extends AbstractComponent {
  static selector = "demo-modal-scope-component";
  dependencies = new Set([ModalComponent.selector]);

  innerScope = new RxScope({
    modal_demo: {
      config: ModalConfig({
        bodyContent: `<div>
          <h3 class="mb_s">Demo modal</h3>
          <p class="description-paragraph">
            Закройте окно кнопкой или кликом по фону.
          </p>
          <div class="mt_m">
            <button class="btn btn-primary btn_s mr_s" onclick="{{ this.closeModal(true) }}">OK</button>
            <button class="btn btn_s" onclick="{{ this.closeModal(false) }}">Cancel</button>
          </div>
        </div>`,
      }),
    },
  });

  modalResult$ = this.newRx<string>("No actions yet");
  closeEvents$ = this.newRxEventFromScopeByIndex(
    this.innerScope,
    "modal_demo",
    "closeModal",
  );

  constructor() {
    super();

    this.newRxFunc((events) => {
      if (!events) return;

      const event = events["0"];
      if (!event) return;

      this.modalResult$.update(event.data?.isOK ? "Closed with OK" : "Closed with Cancel/backdrop");
      events["0"] = null;
    }, this.closeEvents$);
  }

  getHTML() {
    return `<div>
        <button class="btn btn_s btn-primary" onclick="{{ root.openModal() }}">
          Open modal
        </button>
        <div class="mt_s">
          Last result: <b>{{ root.modalResult$::rx }}</b>
        </div>
      </div>`;
  }

  openModal() {
    ModalComponent.attach("modal_demo", this.innerScope.id);
  }
}

componentsRegistryService.define(DemoModalScopeComponent);
