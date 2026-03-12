import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoSimpleComponent extends AbstractComponent {
  static selector = "demo-simple-component";

  getHTML() {
    return `<div>
        <h3>Hello, Cruzo</h3>
        <p>Простой компонент без лишнего</p>
      </div>`;
  }
}

componentsRegistryService.define(DemoSimpleComponent);
