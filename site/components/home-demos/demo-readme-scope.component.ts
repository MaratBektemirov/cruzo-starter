import { AbstractComponent, componentsRegistryService, RxScope } from "cruzo";
import { InputComponent, InputConfig } from "cruzo/ui-components/input";
import { ButtonGroupComponent, ButtonGroupConfig } from "cruzo/ui-components/button-group";

export class DemoScopeComponent extends AbstractComponent {
  static selector = "demo-scope-component";
  dependencies = new Set([InputComponent.selector, ButtonGroupComponent.selector]);

  innerScope = new RxScope({
    input: { config: InputConfig({ placeholder: "Name" }) },
    buttonGroup: { config: ButtonGroupConfig({ items: [{ label: "A", value: "a" }, { label: "B", value: "b" }] }) },
  });
  inputValue$ = this.newRxValueFromScope(this.innerScope, "input");
  choice$ = this.newRxValueFromScope(this.innerScope, "buttonGroup");

  getHTML() {
    return `<div>
        <div class="mb_s">
          <input-component component-id="input" scope-id="${this.innerScope.id}"></input-component>
        </div>
        <div class="mb_s">
          <button-group-component component-id="buttonGroup" scope-id="${this.innerScope.id}"></button-group-component>
        </div>
        <div class="mt_s">
          Input: <b>{{ root.inputValue$::rx }}</b> · Choice: <b>{{ root.choice$::rx }}</b>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoScopeComponent);
