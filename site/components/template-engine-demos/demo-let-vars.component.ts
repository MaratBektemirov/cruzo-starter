import { AbstractComponent, componentsRegistryService } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";

export class DemoLetVarsComponent extends AbstractComponent {
  static selector = "demo-let-vars-component";

  user = this.newRx({ first: "John", last: "Doe" });

  protected getHTML(): string {
    return `<div>
        <div
          let-first="{{ root.user::rx.first }}"
          let-last="{{ root.user::rx.last }}"
          let-full-name="{{ first + ' ' + last }}"
          >
          <div>
            Full name: <b>{{ fullName }}</b>
          </div>

          <div
            let-greeting="{{ 'Hello, ' + fullName + '!' }}"
            class="mt_s"
            >
            Greeting: <b>{{ greeting }}</b>
          </div>
        </div>

        <button class="mt_s ${UI_KIT}_button ${UI_KIT}_button-s mb_s ${UI_KIT}_button-primary" onclick="{{ root.shuffle() }}">
          Randomize
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
