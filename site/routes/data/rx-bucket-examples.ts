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

  discountPercent$ = this.newRx(10);

  quantity$ = this.newRxValueFromBucket(this.innerBucket, "quantity");
  productName$ = this.newRxValueFromBucket(this.innerBucket, "productName");
  quantityState$ = this.newRxStateFromBucket(this.innerBucket, "quantity");
  statusChangeEvent$ = this.newRxEventFromBucket(this.innerBucket, "status", "change");

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
  statusEventsByIndex$ = this.newRxEventFromBucketByIndex(this.innerBucket, "status", "change");

  rawQuantity$ = this.innerBucket.newRxValue("quantity", (value, index, byUser) => ({ value, index, byUser }), this.rxList);
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
  taxPercent$ = this.newRx(20);
  deliveryCity$ = this.newRx("Almaty");
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
`;
