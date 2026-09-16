import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from "./demo-let-vars.component.i18n.json"

export class DemoLetVarsComponent extends AbstractComponent {
  static selector = "demo-let-vars-component";

  user = this.newRx({ first: "John", last: "Doe" });

  i18n$ = i18nService.connect(this, i18n);

  protected getHTML(): string {
    return `<div>
        <div
          let-first="{{ root.user::rx.first }}"
          let-last="{{ root.user::rx.last }}"
          let-full-name="{{ first + ' ' + last }}"
          >
          <div>
            {{ root.i18n$::rx.fullName }}: <b>{{ fullName }}</b>
          </div>

          <div
            let-greeting="{{ root.i18n$::rx.hello + ', ' + fullName + '!' }}"
            class="mt_s"
            >
            {{ root.i18n$::rx.greeting }}: <b>{{ greeting }}</b>
          </div>
        </div>

        <button class="mt_s ${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary" onclick="{{ root.shuffle() }}">
          {{ root.i18n$::rx.randomize }}
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