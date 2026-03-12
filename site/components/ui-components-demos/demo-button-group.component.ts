import { AbstractComponent, componentsRegistryService, RxScope } from "cruzo";
import { ButtonGroupComponent, ButtonGroupConfig } from "cruzo/ui-components/button-group";

export class DemoButtonGroupScopeComponent extends AbstractComponent {
  static selector = "demo-button-group-scope-component";
  dependencies = new Set([ButtonGroupComponent.selector]);

  innerScope = new RxScope({
    button_group: {
      config: ButtonGroupConfig({
        items: [
          { label: "Option A", value: "a" },
          { label: "Option B", value: "b" },
          { label: "Option C", value: "c" }
        ]
      })
    }
  })

  currentButtonGroupValue$ = this.newRxValueFromScope(this.innerScope, 'button_group');

  constructor() {
    super();
  }

  getHTML() {
    return `<div>
        <button-group-component
          component-id="button_group"
          scope-id="${this.innerScope.id}">
        </button-group-component>

        <div class="mt_s">
          Selected: <b>{{ root.currentButtonGroupValue$::rx }}</b>
        </div>
      </div>`;
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

componentsRegistryService.define(DemoButtonGroupScopeComponent);
