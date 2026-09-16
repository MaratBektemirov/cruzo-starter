import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from './demo-conditional.component.i18n.json'

export class DemoConditional extends AbstractComponent {
  static selector = "demo-conditional";

  i18n$ = i18nService.connect(this, i18n);

  showA$ = this.newRx(true);
  showB$ = this.newRx(false);

  protected getHTML(): string {
    return `<div>
        <div class="fx mb_s">
          <button
            onclick="{{ root.toggleA() }}"
            class="${UI_KIT}_button ${UI_KIT}_button-s mr_s {{ root.showA$::rx ? '${UI_KIT}_button-primary' : '${UI_KIT}_button-secondary' }}">
            {{ root.i18n$::rx.toogleA }}
          </button>
          <button
            onclick="{{ root.toggleB() }}"
            class="${UI_KIT}_button ${UI_KIT}_button-s {{ root.showB$::rx ? '${UI_KIT}_button-primary' : '${UI_KIT}_button-secondary' }}">
            {{ root.i18n$::rx.toogleB }}
          </button>
        </div>
        <div attached="{{ root.showA$::rx }}" class="mb_s">{{ root.i18n$::rx.blockA }}</div>
        <div attached="{{ root.showB$::rx }}" class="mb_s">{{ root.i18n$::rx.blockB }}</div>
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
