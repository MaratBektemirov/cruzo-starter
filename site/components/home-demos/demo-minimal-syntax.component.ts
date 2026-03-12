import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoMinimalSyntaxComponent extends AbstractComponent {
  static selector = "demo-minimal-syntax-component";

  items$ = this.newRx(["Один", "Два", "Три"]);

  getHTML() {
    return `<div>
        <div class="mb_s">
          <div repeat="{{ root.items$::rx }}">
            {{ root.items$::rx[index] }}
          </div>
        </div>
        <p>
          Интерполяция, реактивность, циклы — всё просто
        </p>
      </div>`;
  }
}

componentsRegistryService.define(DemoMinimalSyntaxComponent);
