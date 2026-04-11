export const exampleRxBucketCreate = `import { RxBucket } from "cruzo";
import { InputConfig } from "cruzo/ui-components/input";
import { ButtonGroupConfig } from "cruzo/ui-components/button-group";

const formBucket = new RxBucket({
  name: {
    config: InputConfig({ placeholder: "Name" }),
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

formBucket.setValue("name", "Marat");
const name = formBucket.getValue("name");

// One config for a group of same components (same component-id, different indexes):
// All <input-component component-id="name" ...> instances use the same descriptor config.
const html = \`
  <input-component component-id="name" bucket-id="\${formBucket.id}" component-index="0"></input-component>
  <input-component component-id="name" bucket-id="\${formBucket.id}" component-index="1"></input-component>
  <input-component component-id="name" bucket-id="\${formBucket.id}" component-index="2"></input-component>
\`;
`;

export const exampleRxBucketSubscribe = `import { AbstractComponent, AbstractService, RxBucket } from "cruzo";

class OrderFormComponent extends AbstractComponent {
  innerBucket = new RxBucket({
    quantity: {},
    productName: {},
    status: {},
  });

  // Creates local reactive value not bound to bucket.
  discountPercent$ = this.newRx(10);

  // Subscribes to bucket value by component-id (single value stream).
  quantity$ = this.newRxValueFromBucket(this.innerBucket, "quantity");
  // Subscribes to bucket value by component-id (single value stream).
  productName$ = this.newRxValueFromBucket(this.innerBucket, "productName");
  // Subscribes to bucket state by component-id.
  quantityState$ = this.newRxStateFromBucket(this.innerBucket, "quantity");
  // Subscribes to bucket event by component-id.
  statusChangeEvent$ = this.newRxEventFromBucket(this.innerBucket, "status", "change");

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

  // Несколько индексов одного id: отдельные потоки per-index и объединение (ByIndex для value/state в AbstractComponent нет).
  quantityAt0$ = this.newRxValueFromBucket(this.innerBucket, "quantity", "0");
  quantityAt1$ = this.newRxValueFromBucket(this.innerBucket, "quantity", "1");
  quantitiesByIndex$ = this.newRxFunc(
    (q0, q1) => ({ "0": q0, "1": q1 }),
    this.quantityAt0$,
    this.quantityAt1$
  );
  quantityStateAt0$ = this.newRxStateFromBucket(this.innerBucket, "quantity", "0");
  quantityStateAt1$ = this.newRxStateFromBucket(this.innerBucket, "quantity", "1");
  quantityStatesByIndex$ = this.newRxFunc(
    (s0, s1) => ({ "0": s0, "1": s1 }),
    this.quantityStateAt0$,
    this.quantityStateAt1$
  );
  // События по всем индексам: { [index]: event } (есть в AbstractComponent).
  statusEventsByIndex$ = this.newRxEventFromBucketByIndex(this.innerBucket, "status", "change");

  // Direct RxBucket usage (low-level, usually not needed in components):
  // newRxValue callback args: (value, index, byUser)
  rawQuantity$ = this.innerBucket.newRxValue("quantity", (value, index, byUser) => ({ value, index, byUser }), this.rxList);
  // newRxEvent callback args: (event, index)
  rawStatusChanges$ = this.innerBucket.newRxEvent("status", "change", (event, index) => ({ payload: event.data, index }), this.rxList);

  connectedCallback() {
    this.innerBucket.setState("quantity", { dirty: true }, "0", true);

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

export const exampleRxBucketBatch = `import { RxBucket } from "cruzo";

const bucket = new RxBucket({
  email: {},
  phone: {},
  city: {},
});

bucket.setValues({
  email: { "0": "m@example.com" },
  phone: { "0": "+1 555 0000" },
});

bucket.setValuesAtIndex(
  {
    city: "Berlin",
    phone: "+49 30 1111",
  },
  "0",
  true
);

// Подписки: bucket.newRxValue / newRxState / newRxEvent(id, name, fn, rxList) — per (id, index).
// Снимок нескольких полей собирайте через newRxFunc(...) из потоков newRxValue(...) или из this.newRxValueFromBucket(...).
`;
