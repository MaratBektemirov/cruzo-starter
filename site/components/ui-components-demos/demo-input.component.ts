import { AbstractComponent, componentsRegistryService, RxScope } from "cruzo";
import { InputComponent, InputConfig } from "cruzo/ui-components/input";

export class DemoInputScopeComponent extends AbstractComponent {
  static selector = "demo-input-scope-component";
  dependencies = new Set([InputComponent.selector]);

  innerScope = new RxScope({
    input: {
      config: InputConfig({
        placeholder: "Enter your name",
        enableContentWidth: false
      })
    }
  });

  currentInputValue$ = this.newRxValueFromScope(this.innerScope, 'input')

  constructor() {
    super();
  }

  getHTML() {
    return `<div>
        <input-component
          component-id="input"
          scope-id="${this.innerScope.id}">
        </input-component>

        <div class="mt_s">
          Value: <b>{{ root.currentInputValue$::rx }}</b>
        </div>
      </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(DemoInputScopeComponent);
