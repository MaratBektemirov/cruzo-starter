import styles from "./web3.component.module.css"

import { AbstractComponent, componentsRegistryService, RxBucket, i18nService } from "cruzo"
import type { SecretAuthState } from "cruzo-web3"
import { SecretAuthComponent } from "cruzo-web3/components/secret-auth"
import {
  generateSecretAuthNonce,
  verifySecretAuthProofLocal,
} from "cruzo-web3/secret-auth"
import { UI_KIT } from "cruzo/ui-components/const"

import { secretAuthProofDemo } from "site/content/secret-auth-proof-type"
import { SectionIds } from "site/sections"
import { appService } from "site/services/app.service"
import "site/web3-setup"
import i18n from "./secret-auth-page.component.i18n.json"

function text(value: unknown, fallback: string) {
  return typeof value === "string" ? value : fallback;
}

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

  i18n$ = i18nService.connect(this, i18n);

  proofDemo = secretAuthProofDemo();

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

  constructor() {
    super();

    this.newRxFunc((t) => {
      this.innerBucket.setValuesAtIndex({
        secretAuth: {
          config: {
            title: text(t?.title, "SecretAuth"),
            devMode: import.meta.env.DEV,
          },
        },
      });

      if (this.serverVerify$.actual === "—") {
        this.serverVerify$.update(text(t?.dash, "—"));
      }
    }, this.i18n$);
  }

  getHTML() {
    const k = UI_KIT;

    return `<div class="${styles.page}">
        <div class="${styles.signSection}">
          <div class="${styles.signIntro}"
            inner-html="{{ root.i18n$::rx.intro }}"></div>
          <div inner-html="{{ once::root.proofDemo }}"></div>
          <div class="${styles.demoPanel}">
            <div>
              <button type="button"
                class="${k}_button ${k}_button-s ${k}_button-secondary"
                onclick="{{ root.refreshChallenge() }}">{{ root.i18n$::rx.refreshChallenge }}</button>
            </div>

            <div attached="{{ root.devMode$::rx }}">
              <div class="description-paragraph mb_xs">{{ root.i18n$::rx.verify }}:</div>
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
    this.serverVerify$.update(text(this.i18n$.actual.dash, "—"));
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
    const t = this.i18n$.actual;

    if (!state?.proof) {
      this.serverVerify$.update(
        state?.signed ? text(t.waitingForProof, "waiting for proof") : text(t.dash, "—")
      );
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
        this.serverVerify$.update(
          text(this.i18n$.actual.rejected, "rejected: {{reason}}").replace("{{reason}}", String(result.reason))
        );
        return;
      }

      this.serverVerify$.update(
        text(this.i18n$.actual.sessionTokenIssued, "ok — would issue session token")
      );
    });
  }
}

componentsRegistryService.define(SecretAuthPageComponent);