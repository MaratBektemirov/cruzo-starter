import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo";
import { UploadComponent, UploadConfig } from "cruzo/ui-components/upload";

export class DemoUploadBucketComponent extends AbstractComponent {
  static selector = "demo-upload-bucket-component";
  dependencies = new Set([UploadComponent.selector]);

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
          <div>Files: <b>{{ root.getFilesInfo(root.uploadedFiles$::rx) }}</b></div>
        </div>
      </div>`;
  }

  getFilesInfo(files: File[]) {
    if (!files || files.length === 0) return "No files selected";
    return `${files.length} file(s): ${Array.from(files).map(f => f.name).join(", ")}`;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(DemoUploadBucketComponent);
