// Modal body: demo-modal-body.component.ts (onclick/emitEvent — inner-html does not compile nested templates)
import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo";
import { ModalComponent, ModalConfig } from "cruzo/ui-components/modal";
import { UI_KIT } from "cruzo/ui-components/const";
import { DemoModalBodyComponent } from "./demo-modal-body.component";
import { DEMO_MODAL_ID, demoModalScope } from "./demo-modal-scope";

export class DemoModalBucketComponent extends AbstractComponent {
  static selector = "demo-modal-bucket-component";
  dependencies = new Set([ModalComponent.selector]);

  innerBucket = new RxBucket({
    [DEMO_MODAL_ID]: {
      config: ModalConfig({
        bodyContent: `<demo-modal-body-component></demo-modal-body-component>`,
        dependencies: new Set([DemoModalBodyComponent.selector]),
      }),
    },
  });

  modalResult$ = this.newRx<string>("No actions yet");
  closeEvents$ = this.newRxEventFromBucketByIndex(
    this.innerBucket,
    DEMO_MODAL_ID,
    "closeModal",
  );

  constructor() {
    super();
    demoModalScope.bucket = this.innerBucket;

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
    ModalComponent.attach(DEMO_MODAL_ID, this.innerBucket.id);
  }
}

componentsRegistryService.define(DemoModalBucketComponent);
