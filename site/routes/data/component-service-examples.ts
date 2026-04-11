export const exampleAbstractComponent = `import { AbstractComponent, componentsRegistryService } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";

class CounterComponent extends AbstractComponent {
  static selector = "counter-component";

  count$ = this.newRx(0);
  doubled$ = this.newRxFunc((count) => count * 2, this.count$);

  inc() {
    this.count$.update(this.count$.actual + 1);
  }

  getHTML() {
    return \`<div>
      <button class="\${UI_KIT}_button \${UI_KIT}_button-s \${UI_KIT}_button-primary" onclick="{{ root.inc() }}">+1</button>
      <div class="mt_s">count: <b>{{ root.count$::rx }}</b></div>
      <div>doubled: <b>{{ root.doubled$::rx }}</b></div>
    </div>\`;
  }
}

componentsRegistryService.define(CounterComponent);
`;

export const exampleAbstractService = `import { AbstractService } from "cruzo";

class PriceService extends AbstractService {
  price$ = this.newRx(1200);
  quantity$ = this.newRx(2);
  discountPercent$ = this.newRx(10);

  total$ = this.newRxFunc(
    (price, quantity, discountPercent) => {
      const raw = price * quantity;
      return raw * (1 - discountPercent / 100);
    },
    this.price$,
    this.quantity$,
    this.discountPercent$
  );

  setQuantity(quantity: number) {
    this.quantity$.update(quantity);
  }
}

export const priceService = new PriceService();
`;
