import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoConditional extends AbstractComponent {
  static selector = "demo-conditional";

  showA$ = this.newRx(true);
  showB$ = this.newRx(false);

  protected getHTML(): string {
    return `<div>
        <div class="fx mb_s">
          <button
            onclick="{{ root.toggleA() }}"
            class="${UI_KIT}_button ${UI_KIT}_button-s mr_s {{ root.showA$::rx ? '${UI_KIT}_button-primary' : '${UI_KIT}_button-secondary' }}">
            Toggle A
          </button>
          <button
            onclick="{{ root.toggleB() }}"
            class="${UI_KIT}_button ${UI_KIT}_button-s {{ root.showB$::rx ? '${UI_KIT}_button-primary' : '${UI_KIT}_button-secondary' }}">
            Toggle B
          </button>
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
