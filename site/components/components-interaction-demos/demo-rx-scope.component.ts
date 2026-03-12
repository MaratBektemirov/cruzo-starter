import { AbstractComponent, componentsRegistryService, RxScope } from "cruzo";
import { InputComponent, InputConfig } from "cruzo/ui-components/input";
import { ButtonGroupComponent, ButtonGroupConfig } from "cruzo/ui-components/button-group";

export class DemoRxScopeComponent extends AbstractComponent {
  static selector = "demo-rx-scope-component";
  dependencies = new Set([InputComponent.selector, ButtonGroupComponent.selector]);

  innerScope = new RxScope({
    input: { config: InputConfig({ placeholder: "Enter your name" }) },
    buttonGroup: {
      config: ButtonGroupConfig({
        items: [
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
          { label: "Option C", value: "c" }
        ]
      })
    }
  });

  currentInputValue$ = this.newRxValueFromScope(this.innerScope, 'input')
  currentButtonGroupValue$ = this.newRxValueFromScope(this.innerScope, 'buttonGroup');

  constructor() {
    super();
  }

  getHTML() {
    return `<div>
        <div class="mb_m">
          <input-component
            component-id="input"
            scope-id="${this.innerScope.id}">
          </input-component>
        </div>

        <div class="mb_m">
          <button-group-component
            component-id="buttonGroup"
            scope-id="${this.innerScope.id}">
          </button-group-component>
        </div>

        <div class="mt_s">
          <div>Input value: <b>{{ root.currentInputValue$::rx }}</b></div>
          <div class="mt_xs">Selected: <b>{{ root.currentButtonGroupValue$::rx }}</b></div>
        </div>
      </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(DemoRxScopeComponent);
