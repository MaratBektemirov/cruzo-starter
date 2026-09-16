import { AbstractComponent, componentsRegistryService, RxBucket, i18nService } from "cruzo"
import { UploadComponent, UploadConfig } from "cruzo/ui-components/upload"
import i18n from "./demo-upload-bucket.component.i18n.json"

export class DemoUploadBucketComponent extends AbstractComponent {
  static selector = "demo-upload-bucket-component";
  dependencies = new Set([UploadComponent.selector]);

  i18n$ = i18nService.connect(this, i18n);

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
          <div>{{ root.i18n$::rx.files }}: <b>{{ root.getFilesInfo(root.uploadedFiles$::rx, root.i18n$::rx) }}</b></div>
        </div>
      </div>`;
  }

  getFilesInfo(files: File[]) {
    const t = this.i18n$.actual;

    if (!files || files.length === 0) {
      return typeof t.noFilesSelected === "string" ? t.noFilesSelected : "No files selected";
    }

    const names = Array.from(files).map((f) => f.name).join(", ");
    return `${t.plural("filesSelected", files.length)}: ${names}`;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(DemoUploadBucketComponent);