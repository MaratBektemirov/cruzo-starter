import { AbstractComponent, componentsRegistryService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import { getTranslater } from 'site/utils/get-translater'
import i18n from "./demo-let-vars.component.i18n.json"

export class DemoLetVarsComponent extends AbstractComponent {
  static selector = "demo-let-vars-component";

  user = this.newRx({ first: "John", last: "Doe" });

  t$ = getTranslater(i18n, this)

  protected getHTML(): string {
    return `<div>
        <div
          let-first="{{ root.user::rx.first }}"
          let-last="{{ root.user::rx.last }}"
          let-full-name="{{ first + ' ' + last }}"
          >
          <div>
            {{ root.t$::rx?.fullName }}: <b>{{ fullName }}</b>
          </div>

          <div
            let-greeting="{{ root.t$::rx?.hello + ', ' + fullName + '!' }}"
            class="mt_s"
            >
            {{ root.t$::rx?.greeting }}: <b>{{ greeting }}</b>
          </div>
        </div>

        <button class="mt_s ${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary" onclick="{{ root.shuffle() }}">
          {{ root.t$::rx?.randomize }}
        </button>
      </div>`;
  }

  shuffle() {
    const first = ["John", "Alice", "Max", "Kate"][Math.floor(Math.random() * 4)];
    const last = ["Doe", "Smith", "Brown", "Taylor"][Math.floor(Math.random() * 4)];
    this.user.update({ first, last });
  }
}

componentsRegistryService.define(DemoLetVarsComponent);