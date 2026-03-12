import { AbstractComponent, componentsRegistryService, RxScope } from "cruzo";
import { UploadComponent, UploadConfig } from "cruzo/ui-components/upload";

export class DemoUploadScopeComponent extends AbstractComponent {
  static selector = "demo-upload-scope-component";
  dependencies = new Set([UploadComponent.selector]);

  innerScope = new RxScope({
    upload: {
      config: UploadConfig({
        accept: "image/*"
      })
    }
  });

  uploadedFiles$ = this.newRxValueFromScope(this.innerScope, 'upload')

  constructor() {
    super();
  }

  getHTML() {
    return `<div>
        <upload-component
          component-id="upload"
          scope-id="${this.innerScope.id}">
        </upload-component>

        <div class="mt_s">
          <div>Files: <b>{{ root.getFilesInfo(root.uploadedFiles$::rx) }}</b></div>
        </div>
      </div>`;
  }

  getFilesInfo(files: File[]) {
    if (!files || files.length === 0) return 'No files selected';
    return `${files.length} file(s): ${Array.from(files).map(f => f.name).join(', ')}`;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(DemoUploadScopeComponent);
