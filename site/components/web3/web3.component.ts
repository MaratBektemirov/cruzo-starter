import styles from "./web3.component.module.css";

import { AbstractComponent, componentsRegistryService } from "cruzo";

import { appService } from "site/services/app.service";
import { SectionIds } from "site/sections";

export class Web3Component extends AbstractComponent {
  static selector = "web3-component";

  sections$ = appService.sections$;

  getHTML() {
    const introId = SectionIds["web3-intro"];

    return `<div class="${styles.page}">
        <div inner-html="{{ once::root.sections$::rx['${introId}'].demos[1] }}"></div>
      </div>`;
  }

  connectedCallback() {
    appService.currentSectionId$.update(SectionIds["web3-intro"]);
    super.connectedCallback();
  }
}

componentsRegistryService.define(Web3Component);
