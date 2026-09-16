import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"

export class LangSwitchComponent extends AbstractComponent {
  static selector = "lang-switch-component";

  lang$ = this.newRxFunc(() => i18nService.lang$.actual, i18nService.lang$);

  toggle() {
    i18nService.setLang(this.lang$.actual === "ru" ? "en" : "ru");
  }

  getHTML() {
    return `
      <button
        class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary"
        onclick="{{ root.toggle() }}">
        {{ root.lang$::rx === "ru" ? "EN" : "RU" }}
      </button>
    `;
  }
}

componentsRegistryService.define(LangSwitchComponent);
