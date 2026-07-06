import styles from "./web3.component.module.css"

import { AbstractComponent, componentsRegistryService } from "cruzo"
import { Web3SigningComponent } from "cruzo-web3/components/web3-signing"
import { SectionIds } from "site/sections"
import { appService } from "site/services/app.service"

import "site/web3-setup"

export class Web3SignComponent extends AbstractComponent {
  static selector = "web3-sign-component";

  dependencies = new Set([Web3SigningComponent.selector]);

  getHTML() {
    return `<div class="${styles.page}">
      <div class="${styles.signSection}">
        <web3-signing-component></web3-signing-component>
      </div>
    </div>`;
  }

  async connectedCallback() {
    appService.currentSectionId$.update(SectionIds["web3-sign"]);
    await super.connectedCallback();
  }
}

componentsRegistryService.define(Web3SignComponent);