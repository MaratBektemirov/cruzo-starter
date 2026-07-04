import styles from "./web3.component.module.css"

import { AbstractComponent, componentsRegistryService, RxBucket } from "cruzo"
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
import { getTranslater } from "site/utils/get-translater"
import "site/web3-setup"
import i18n from "./secret-auth-page.component.i18n.json"

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

  t$ = getTranslater(i18n, this);

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
            // @ts-expect-error
            title: t?.title ?? "SecretAuth",
            devMode: import.meta.env.DEV,
          },
        },
      });

      if (this.serverVerify$.actual === "—") {
        // @ts-expect-error
        this.serverVerify$.update(t?.dash ?? "—");
      }
    }, this.t$);
  }

  getHTML() {
    const k = UI_KIT;

    return `<div class="${styles.page}">
        <div class="${styles.signSection}">
          <div class="${styles.signIntro}"
            inner-html="{{ root.t$::rx?.intro }}"></div>
          <div inner-html="{{ once::root.proofDemo }}"></div>
          <div class="${styles.demoPanel}">
            <div>
              <button type="button"
                class="${k}_button ${k}_button-s ${k}_button-secondary"
                onclick="{{ root.refreshChallenge() }}">{{ root.t$::rx?.refreshChallenge }}</button>
            </div>

            <div attached="{{ root.devMode$::rx }}">
              <div class="description-paragraph mb_xs">{{ root.t$::rx?.verify }}:</div>
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
    // @ts-expect-error
    this.serverVerify$.update(this.t$.actual?.dash ?? "—");
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
    const t = this.t$.actual;

    if (!state?.proof) {
      this.serverVerify$.update(
        // @ts-expect-error
        state?.signed ? (t?.waitingForProof ?? "waiting for proof") : (t?.dash ?? "—")
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
          // @ts-expect-error
          (this.t$.actual?.rejected ?? "rejected: {{reason}}").replace("{{reason}}", String(result.reason))
        );
        return;
      }

      this.serverVerify$.update(
        // @ts-expect-error
        this.t$.actual?.sessionTokenIssued ?? "ok — would issue session token"
      );
    });
  }
}

componentsRegistryService.define(SecretAuthPageComponent);