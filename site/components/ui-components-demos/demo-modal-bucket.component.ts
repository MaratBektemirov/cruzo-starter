import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo";
import { ModalComponent, ModalConfig } from "cruzo/ui-components/modal";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoModalBucketComponent extends AbstractComponent {
  static selector = "demo-modal-bucket-component";
  dependencies = new Set([ModalComponent.selector]);

  innerBucket = new RxBucket({
    modal_demo: {
      config: ModalConfig({
        bodyContent: `<div>
          <h3 class="mb_s">Demo modal</h3>
          <p class="description-paragraph">
            Закройте окно кнопкой или кликом по фону.
          </p>
          <div class="mt_m">
            <button class="${UI_KIT}_button ${UI_KIT}_button-primary ${UI_KIT}_button-s mr_s" onclick="{{ this.closeModal(true) }}">OK</button>
            <button class="${UI_KIT}_button ${UI_KIT}_button-s" onclick="{{ this.closeModal(false) }}">Cancel</button>
          </div>
        </div>`,
      }),
    },
  });

  modalResult$ = this.newRx<string>("No actions yet");
  closeEvents$ = this.newRxEventFromBucketByIndex(
    this.innerBucket,
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
        <button class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary" onclick="{{ root.openModal() }}">
          Open modal
        </button>
        <div class="mt_s">
          Last result: <b>{{ root.modalResult$::rx }}</b>
        </div>
      </div>`;
  }

  openModal() {
    ModalComponent.attach("modal_demo", this.innerBucket.id);
  }
}

componentsRegistryService.define(DemoModalBucketComponent);
