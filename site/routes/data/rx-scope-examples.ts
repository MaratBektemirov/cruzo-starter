export const exampleRxScopeCreate = `import { RxScope } from "cruzo";
import { InputConfig, ButtonGroupConfig } from "cruzo/ui-components";

const formScope = new RxScope({
  name: {
    config: InputConfig({ label: "Name" }),
  },
  role: {
    config: ButtonGroupConfig({
      items: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    }),
  },
});

formScope.setValue("name", "Marat");
const name = formScope.getValue("name");

// One config for a group of same components (same component-id, different indexes):
// All <input-component component-id="name" ...> instances use the same descriptor config.
const html = \`
  <input-component component-id="name" scope-id="\${formScope.id}" component-index="0"></input-component>
  <input-component component-id="name" scope-id="\${formScope.id}" component-index="1"></input-component>
  <input-component component-id="name" scope-id="\${formScope.id}" component-index="2"></input-component>
\`;
`;

export const exampleRxScopeSubscribe = `import { AbstractComponent, AbstractService, RxScope } from "cruzo";

class OrderFormComponent extends AbstractComponent {
  innerScope = new RxScope({
    quantity: {},
    productName: {},
    status: {},
  });

  // Creates local reactive value not bound to scope.
  discountPercent$ = this.newRx(10);

  // Subscribes to scope value by component-id (single value stream).
  quantity$ = this.newRxValueFromScope(this.innerScope, "quantity");
  // Subscribes to scope value by component-id (single value stream).
  productName$ = this.newRxValueFromScope(this.innerScope, "productName");
  // Subscribes to scope state by component-id.
  quantityState$ = this.newRxStateFromScope(this.innerScope, "quantity");
  // Subscribes to scope event by component-id.
  statusChangeEvent$ = this.newRxEventFromScope(this.innerScope, "status", "change");

  // Creates derived reactive value from dependencies.
  summary$ = this.newRxFunc(
    (quantity, productName, discountPercent) => ({
      productName,
      quantity,
      discountPercent,
      lineTotal: (quantity || 0) * 1200 * (1 - discountPercent / 100),
    }),
    this.quantity$,
    this.productName$,
    this.discountPercent$
  );

  // Subscribes to scope values grouped by index: { [index]: value }.
  quantitiesByIndex$ = this.newRxValueFromScopeByIndex(this.innerScope, "quantity");
  // Subscribes to scope states grouped by index: { [index]: state }.
  quantityStatesByIndex$ = this.newRxStateFromScopeByIndex(this.innerScope, "quantity");
  // Subscribes to scope events grouped by index: { [index]: event }.
  statusEventsByIndex$ = this.newRxEventFromScopeByIndex(this.innerScope, "status", "change");

  // Direct RxScope usage (low-level, usually not needed in components):
  // newRxValue callback args: (value, index, byUser)
  rawQuantity$ = this.innerScope.newRxValue("quantity", (value, index, byUser) => ({ value, index, byUser }), this.rxList);
  // newRxEvent callback args: (event, index)
  rawStatusChanges$ = this.innerScope.newRxEvent("status", "change", (event, index) => ({ payload: event.data, index }), this.rxList);

  connectedCallback() {
    this.innerScope.setState("quantity", { dirty: true }, "0", true);

    this.newRxFunc(
      (summary, quantityState, statusEvent, byIndexValues, byIndexStates, byIndexEvents, rawQuantity, rawStatus) => {
        console.log("order form changed", {
          summary,
          quantityState,
          statusEvent,
          byIndexValues,
          byIndexStates,
          byIndexEvents,
          rawQuantity,
          rawStatus,
        });
      },
      this.summary$,
      this.quantityState$,
      this.statusChangeEvent$,
      this.quantitiesByIndex$,
      this.quantityStatesByIndex$,
      this.statusEventsByIndex$,
      this.rawQuantity$,
      this.rawStatusChanges$
    );
  }
}

class OrderService extends AbstractService {
  // Base reactive value for service-level state.
  taxPercent$ = this.newRx(20);
  // Another service state value.
  deliveryCity$ = this.newRx("Almaty");
  // Derived service state from multiple dependencies.
  deliveryNote$ = this.newRxFunc(
    (taxPercent, deliveryCity) => "Shipping to " + deliveryCity + " with VAT " + taxPercent + "%",
    this.taxPercent$,
    this.deliveryCity$
  );
}
`;

export const exampleRxScopeBatch = `import { RxScope } from "cruzo";

const scope = new RxScope({
  email: {},
  phone: {},
  city: {},
});

scope.setValues({
  email: { "0": "m@example.com" },
  phone: { "0": "+1 555 0000" },
});

scope.setValuesAtIndex(
  {
    city: "Berlin",
    phone: "+49 30 1111",
  },
  "0",
  true
);

const allValues$ = scope.newRxAllValues((values) => values);
`;
