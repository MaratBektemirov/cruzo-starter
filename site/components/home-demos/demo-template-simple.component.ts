import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoTemplateSimpleComponent extends AbstractComponent {
  static selector = "demo-template-simple-component";

  name = "World";

  getHTML() {
    return `<div class="mt_s">Hello, <b>{{ root.name }}</b></div>`;
  }
}

componentsRegistryService.define(DemoTemplateSimpleComponent);
