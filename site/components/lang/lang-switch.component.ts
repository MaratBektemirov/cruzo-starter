import { AbstractComponent, componentsRegistryService } from "cruzo"
import styles from "../../css/lang-switch.css?inline"
import { langService } from "../../services/lang.service.js"

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
      <style>${styles}</style>
      <button class="lang-switch" onclick="{{ root.toggle() }}">
        {{ root.lang$::rx === "ru" ? "EN" : "RU" }}
      </button>
    `;
  }
}

componentsRegistryService.define(LangSwitchComponent);