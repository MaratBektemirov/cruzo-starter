import styles from "./web3.component.module.css"

import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { SecretAuthComponent } from "cruzo-web3/components/secret-auth"
import {
  generateSecretAuthNonce,
  verifySecretAuthProofLocal,
} from "cruzo-web3/secret-auth"
import type { SecretAuthState } from "cruzo-web3"

import { SectionIds } from "site/sections"
import { appService } from "site/services/app.service"

import "site/web3-setup"

function mockServerIssueSecretAuthChallenge() {
  return {
    domain: window.location.hostname || "localhost",
    nonce: generateSecretAuthNonce(),
    exp: Math.floor(Date.now() / 1000) + 300,
  };
}

export class SecretAuthPageComponent extends AbstractComponent {
  static selector = "secret-auth-page-component";

  dependencies = new Set([SecretAuthComponent.selector]);

  sections$ = appService.sections$;
  serverVerify$ = this.newRx("—");

  innerBucket = new RxBucket({
    secretAuth: {
      config: {
        title: "SecretAuth",
        devMode: import.meta.env.DEV,
      },
    },
  });

  devMode$ = this.newRx(import.meta.env.DEV);

  secretAuthState$ = this.newRxStateFromBucket(this.innerBucket, "secretAuth");

  private verifyGeneration = 0;

  getHTML() {
    const k = UI_KIT;
    const secretAuthId = SectionIds["web3-secret-auth"];

    return `<div class="${styles.page}">
        <div class="${styles.signSection}">
          <div class="${styles.signIntro}"
            inner-html="{{ root.sections$::rx?.['${secretAuthId}']?.demos?.[3] }}"></div>
          <div class="${styles.demoPanel}">
            <div>
              <button type="button"
                class="${k}_button ${k}_button-s ${k}_button-secondary"
                onclick="{{ root.refreshChallenge() }}">Refresh challenge</button>
            </div>

            <div attached="{{ root.devMode$::rx }}">
              <div class="description-paragraph mb_xs">Verify:</div>
              <div class="block">
                <pre class="${styles.serverVerify}">{{ root.serverVerify$::rx }}</pre>
              </div>
            </div>

            <secret-auth-component
              component-id="secretAuth"
              bucket-id="${this.innerBucket.id}">
            </secret-auth-component>
          </div>
        </div>
      </div>`;
  }

  connectedCallback() {
    componentsRegistryService.connectBucket(this.innerBucket);
    this.innerBucket.setState("secretAuth", this.initialState());
    appService.currentSectionId$.update(SectionIds["web3-secret-auth"]);
    super.connectedCallback();

    this.newRxFunc((state) => {
      this.updateServerVerify(state);
    }, this.secretAuthState$);
  }

  refreshChallenge() {
    this.innerBucket.setState("secretAuth", this.initialState());
    this.serverVerify$.update("—");
  }

  private initialState(): SecretAuthState {
    return {
      challenge: mockServerIssueSecretAuthChallenge(),
      proof: null,
      signed: false,
      pubKey: null,
      mode: null,
      wallet: null,
      passkey: null,
    };
  }

  private updateServerVerify(state: SecretAuthState | null | undefined) {
    const generation = ++this.verifyGeneration;

    if (!state?.proof) {
      this.serverVerify$.update(state?.signed ? "waiting for proof" : "—");
      return;
    }

    verifySecretAuthProofLocal(state.proof, {
      domain: window.location.hostname || "localhost",
      webauthn: state.passkey
        ? {
            credentialPublicKey: state.passkey.credentialPublicKey,
            expectedOrigin: window.location.origin,
          }
        : undefined,
    }).then((result) => {
      if (generation !== this.verifyGeneration) return;

      if (result.ok === false) {
        this.serverVerify$.update(`rejected: ${result.reason}`);
        return;
      }

      this.serverVerify$.update("ok — would issue session token");
    });
  }
}

componentsRegistryService.define(SecretAuthPageComponent);
