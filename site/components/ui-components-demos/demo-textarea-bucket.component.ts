import { AbstractComponent, componentsRegistryService, RxBucket, toastService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { TextareaComponent, TextareaConfig } from "cruzo/ui-components/textarea"
import i18n from './demo-textarea-bucket.component.i18n.json'

export class DemoTextareaBucketComponent extends AbstractComponent {
  static selector = "demo-textarea-bucket-component";
  dependencies = new Set([TextareaComponent.selector]);

  i18n$ = i18nService.connect(this, i18n);

  innerBucket = new RxBucket({
    textarea: {
      config: TextareaConfig({
        placeholder: "Enter multi-line text…",
        rows: 5,
      }),
    },
  });

  currentValue$ = this.newRxValueFromBucket(this.innerBucket, "textarea");

  getHTML() {
    const k = UI_KIT;

    return `<div>
        <textarea-component component-id="textarea" bucket-id="${this.innerBucket.id}"></textarea-component>

        <div class="mt_s">
          <button type="button" class="${k}_button ${k}_button-s ${k}_button-secondary"
            onclick="{{root.showToast()}}">{{ root.i18n$::rx.showToast }}</button>
        </div>

        <div class="mt_s">
          {{ root.i18n$::rx.value}}:
          <pre class="block" style="margin:0; white-space:pre-wrap; font-family:var(--mono); font-size:13px; line-height:1.6;">{{ root.currentValue$::rx }}</pre>
        </div>
      </div>`;
  }

  showToast() {
    toastService.show({
      kind: "info",
      title: "Textarea",
      message: `Length: ${(this.currentValue$?.actual ?? "").length}`,
    });
  }
}

componentsRegistryService.define(DemoTextareaBucketComponent);
