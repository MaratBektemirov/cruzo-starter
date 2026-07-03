import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo"
import { UploadComponent, UploadConfig } from "cruzo/ui-components/upload"
import { langService } from "site/services/lang.service"
import i18n from "./demo-upload-bucket.component.i18n.json"

export class DemoUploadBucketComponent extends AbstractComponent {
  static selector = "demo-upload-bucket-component";
  dependencies = new Set([UploadComponent.selector]);

  i18n = i18n;
  lang$ = this.newRxFunc(() => langService.lang$.actual, langService.lang$);
  t$ = this.newRxFunc((lang) => this.i18n[lang], this.lang$);

  innerBucket = new RxBucket({
    upload: {
      config: UploadConfig({
        accept: "image/*"
      })
    }
  });

  uploadedFiles$ = this.newRxValueFromBucket(this.innerBucket, "upload");

  constructor() {
    super();
  }

  getHTML() {
    return `<div>
        <upload-component
          component-id="upload"
          bucket-id="${this.innerBucket.id}">
        </upload-component>

        <div class="mt_s">
          <div>{{ root.t$::rx.files }}: <b>{{ root.getFilesInfo(root.uploadedFiles$::rx) }}</b></div>
        </div>
      </div>`;
  }

  getFilesInfo(files: File[]) {
    const t = this.t$.actual;

    if (!files || files.length === 0) {
      return t?.noFilesSelected ?? "No files selected";
    }

    return (t?.filesSelected ?? "{{count}} file(s): {{names}}")
      .replace("{{count}}", String(files.length))
      .replace("{{names}}", Array.from(files).map((f) => f.name).join(", "));
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(DemoUploadBucketComponent);