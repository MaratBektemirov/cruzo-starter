import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from 'site/services/lang.service'

export class DemoAttachedComponent extends AbstractComponent {
  static selector = "demo-attached-component";

  info_ru = this.newRx('Этот блок реально присутствует в DOM только когда');
  info_en = this.newRx('This block actually exists in the DOM only when');
  open = this.newRx(true);

  lang$ = this.newRxFunc(
    () => langService.lang$.actual,
    langService.lang$
  );

  protected getHTML(): string {
    return `<div>
        <button class="${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary" onclick="{{ root.open.update(!root.open::rx) }}">
          Toggle
        </button>

        <div attached="{{ root.open::rx }}" class="description-note">
          {{ root.lang$::rx === 'ru' ? root.info_ru::rx : root.info_en::rx }} <code class="description-inline-code">open === true</code>
        </div>

        <div class="mt_s">
          open: <b>{{ root.open::rx }}</b>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoAttachedComponent);
