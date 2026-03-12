import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";

export class DemoConditional extends AbstractComponent {
  static selector = "demo-conditional";

  showA$ = this.newRx(true);
  showB$ = this.newRx(false);

  protected getHTML(): string {
    return `<div>
        <div class="fx fx-gap mb_s">
          <button onclick="{{ root.toggleA() }}" class="btn btn_s btn-primary">Toggle A</button>
          <button onclick="{{ root.toggleB() }}" class="btn btn_s btn-secondary">Toggle B</button>
        </div>
        <div attached="{{ root.showA$::rx }}" class="mb_s">Block A is visible</div>
        <div attached="{{ root.showB$::rx }}" class="mb_s">Block B is visible</div>
        <p>A: {{ root.showA$::rx }}, B: {{ root.showB$::rx }}</p>
      </div>`;
  }

  toggleA() {
    this.showA$.update(!this.showA$.actual);
  }

  toggleB() {
    this.showB$.update(!this.showB$.actual);
  }
}

componentsRegistryService.define(DemoConditional);
