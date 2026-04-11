import { AbstractComponent, componentsRegistryService } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoUiCssClassesComponent extends AbstractComponent {
  static selector = "demo-ui-css-classes-component";

  getHTML() {
    const k = UI_KIT;
    return `<div>
        <div class="mb_m">
          <div class="description-note mb_s">Размеры кнопок</div>
          <div class="demo-ui-css-classes_sizes">
            <div class="demo-ui-css-classes_slot">
              <button type="button" class="${k}_button ${k}_button-xxs ${k}_button-primary">xxs</button>
            </div>
            <div class="demo-ui-css-classes_slot">
              <button type="button" class="${k}_button ${k}_button-xs ${k}_button-primary">xs</button>
            </div>
            <div class="demo-ui-css-classes_slot">
              <button type="button" class="${k}_button ${k}_button-s ${k}_button-primary">s</button>
            </div>
            <div class="demo-ui-css-classes_slot">
              <button type="button" class="${k}_button ${k}_button-m ${k}_button-primary">m</button>
            </div>
            <div class="demo-ui-css-classes_slot">
              <button type="button" class="${k}_button ${k}_button-l ${k}_button-primary">l</button>
            </div>
            <div class="demo-ui-css-classes_slot">
              <button type="button" class="${k}_button ${k}_button-xl ${k}_button-primary">xl</button>
            </div>
            <div class="demo-ui-css-classes_slot">
              <button type="button" class="${k}_button ${k}_button-xxl ${k}_button-primary">xxl</button>
            </div>
          </div>
        </div>
        <div class="mb_m">
          <div class="description-note mb_s">Варианты заливки</div>
          <div class="demo-ui-css-classes_sizes">
            <div class="demo-ui-css-classes_slot">
              <button type="button" class="${k}_button ${k}_button-s ${k}_button-primary">primary</button>
            </div>
            <div class="demo-ui-css-classes_slot">
              <button type="button" class="${k}_button ${k}_button-s ${k}_button-secondary">secondary</button>
            </div>
          </div>
        </div>
        <div>
          <label class="${k}_checkbox">
            <input type="checkbox" class="${k}_checkbox-input" checked />
            Пример чекбокса
          </label>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoUiCssClassesComponent);
