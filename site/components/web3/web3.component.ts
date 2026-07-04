import { AbstractComponent, componentsRegistryService } from "cruzo"
import { SectionIds } from "site/sections"
import { appService } from "site/services/app.service"
import { getTranslater } from 'site/utils/get-translater'
import i18n from "./web3.component.i18n.json"

export class Web3Component extends AbstractComponent {
  static selector = "web3-component";

  t$ = getTranslater(i18n, this)

  getHTML() {
    return `
      <section>
        <h2 class="mt_xl mb_s">{{ root.t$::rx?.installationTitle }}</h2>
        <div class="block mb_xl">
          <pre style="margin:0;font-family:var(--mono);font-size:13px;line-height:1.6;white-space:pre-wrap;">{{ root.t$::rx?.installCommand }}</pre>
        </div>

        <h2 class="mb_s">{{ root.t$::rx?.quickStartTitle }}</h2>
        <div class="block mb_m">
          <pre style="margin:0;font-family:var(--mono);font-size:13px;line-height:1.6;white-space:pre-wrap;">{{ root.t$::rx?.quickStartCode }}</pre>
        </div>

        <h2 class="mb_s">{{ root.t$::rx?.mobileWalletsTitle }}</h2>
        <ul class="description-list">
          <li class="description-list-item">
            <b>Ethereum (WalletConnect)</b> — {{ root.t$::rx?.ethereumWalletConnect }}
          </li>
          <li class="description-list-item">
            <b>TON</b> — {{ root.t$::rx?.tonSetup }}
          </li>
        </ul>
      </section>
    `;
  }

  async connectedCallback() {
    appService.currentSectionId$.update(SectionIds["web3-intro"]);
    await super.connectedCallback();
  }
}

componentsRegistryService.define(Web3Component);