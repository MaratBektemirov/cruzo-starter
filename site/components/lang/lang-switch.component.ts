import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { langService } from "site/services/lang.service"

export class LangSwitchComponent extends AbstractComponent {
  static selector = "lang-switch-component";

  lang$ = this.newRxFunc(
    () => langService.lang$.actual,
    langService.lang$
  );

  toggle() {
    langService.toggle();
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