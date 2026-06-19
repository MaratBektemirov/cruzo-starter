import styles from "./web3.component.module.css";

import { AbstractComponent, componentsRegistryService } from "cruzo";
import { Web3SigningComponent } from "cruzo-web3/components/web3-signing";

import { appService } from "site/services/app.service";
import { SectionIds } from "site/sections";

import "site/web3-setup";

export class Web3SignComponent extends AbstractComponent {
  static selector = "web3-sign-component";

  dependencies = new Set([Web3SigningComponent.selector]);

  sections$ = appService.sections$;

  getHTML() {
    const signId = SectionIds["web3-sign"];

    return `<div class="${styles.page}">
        <div class="${styles.signSection}">
          <div class="${styles.signIntro}"
            inner-html="{{ once::root.sections$::rx['${signId}'].demos[1] }}"></div>
          <web3-signing-component></web3-signing-component>
        </div>
      </div>`;
  }

  connectedCallback() {
    appService.currentSectionId$.update(SectionIds["web3-sign"]);
    super.connectedCallback();
  }
}

componentsRegistryService.define(Web3SignComponent);
