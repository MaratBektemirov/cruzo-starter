import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { ModalComponent, ModalConfig } from "cruzo/ui-components/modal"
import { langService } from "site/services/lang.service"
import { DemoModalBodyComponent } from "./demo-modal-body.component"
import i18n from "./demo-modal-bucket.component.i18n.json"
import { DEMO_MODAL_ID, demoModalScope } from "./demo-modal-scope"

export class DemoModalBucketComponent extends AbstractComponent {
  static selector = "demo-modal-bucket-component";
  dependencies = new Set([ModalComponent.selector]);

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  innerBucket = new RxBucket({
    [DEMO_MODAL_ID]: {
      config: ModalConfig({
        bodyContent: `<demo-modal-body-component></demo-modal-body-component>`,
        dependencies: new Set([DemoModalBodyComponent.selector]),
      }),
    },
  });

  modalResult$ = this.newRx<string>(this.t$.actual?.noActionsYet ?? "No actions yet");
  closeEvents$ = this.newRxEventFromBucketByIndex(
    this.innerBucket,
    DEMO_MODAL_ID,
    "closeModal",
  );

  constructor() {
    super();
    demoModalScope.bucket = this.innerBucket;

    this.newRxFunc((lang) => {
      if (!this.modalResult$.actual || this.modalResult$.actual === "No actions yet" || this.modalResult$.actual === "Действий пока не было") {
        this.modalResult$.update(this.i18n[lang]?.noActionsYet ?? "No actions yet");
      }
    }, this.lang$);

    this.newRxFunc((events, lang) => {
      if (!events) return;

      const event = events["0"];
      if (!event) return;

      this.modalResult$.update(
        event.data?.isOK
          ? this.i18n[lang]?.closedWithOk ?? "Closed with OK"
          : this.i18n[lang]?.closedWithCancelOrBackdrop ?? "Closed with Cancel/backdrop"
      );

      events["0"] = null;
    }, this.closeEvents$, this.lang$);
  }

  getHTML() {
    return `<div>
        <button
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary"
          onclick="{{ root.openModal() }}"
        >
          {{ root.t$::rx?.openModal }}
        </button>

        <div class="mt_s">
          {{ root.t$::rx?.lastResult }}: <b>{{ root.modalResult$::rx }}</b>
        </div>
      </div>`;
  }

  openModal() {
    ModalComponent.attach(DEMO_MODAL_ID, this.innerBucket.id);
  }
}

componentsRegistryService.define(DemoModalBucketComponent);