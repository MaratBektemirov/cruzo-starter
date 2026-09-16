import { AbstractComponent, componentsRegistryService, RxBucket, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { ModalComponent, ModalConfig } from "cruzo/ui-components/modal"
import { DemoModalBodyComponent } from "./demo-modal-body.component"
import i18n from "./demo-modal-bucket.component.i18n.json"
import { DEMO_MODAL_ID, demoModalScope } from "./demo-modal-scope"

const IDLE_RESULTS = new Set(["No actions yet", "Действий пока не было"]);

export class DemoModalBucketComponent extends AbstractComponent {
  static selector = "demo-modal-bucket-component";
  dependencies = new Set([ModalComponent.selector]);

  i18n$ = i18nService.connect(this, i18n);

  innerBucket = new RxBucket({
    [DEMO_MODAL_ID]: {
      config: ModalConfig({
        bodyContent: `<demo-modal-body-component></demo-modal-body-component>`,
        dependencies: new Set([DemoModalBodyComponent.selector]),
      }),
    },
  });

  modalResult$ = this.newRx<string>(String(this.i18n$.actual.noActionsYet ?? "No actions yet"));
  closeEvents$ = this.newRxEventFromBucketByIndex(
    this.innerBucket,
    DEMO_MODAL_ID,
    "closeModal",
  );

  constructor() {
    super();
    demoModalScope.bucket = this.innerBucket;

    this.newRxFunc((view) => {
      if (!this.modalResult$.actual || IDLE_RESULTS.has(this.modalResult$.actual)) {
        this.modalResult$.update(String(view.noActionsYet ?? "No actions yet"));
      }
    }, this.i18n$);

    this.newRxFunc((events) => {
      if (!events) return;

      const event = events["0"];
      if (!event) return;

      const view = this.i18n$.actual;
      this.modalResult$.update(
        event.data?.isOK
          ? String(view.closedWithOk ?? "Closed with OK")
          : String(view.closedWithCancelOrBackdrop ?? "Closed with Cancel/backdrop")
      );

      events["0"] = null;
    }, this.closeEvents$);
  }

  getHTML() {
    return `<div>
        <button
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary"
          onclick="{{ root.openModal() }}"
        >
          {{ root.i18n$::rx.openModal }}
        </button>

        <div class="mt_s">
          {{ root.i18n$::rx.lastResult }}: <b>{{ root.modalResult$::rx }}</b>
        </div>
      </div>`;
  }

  openModal() {
    ModalComponent.attach(DEMO_MODAL_ID, this.innerBucket.id);
  }
}

componentsRegistryService.define(DemoModalBucketComponent);