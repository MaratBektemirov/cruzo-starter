import { AbstractComponent, componentsRegistryService, Rx } from "cruzo";

export class DemoRepeatComponent extends AbstractComponent {
  static selector = "demo-repeat-component";

  items = [
    this.newRx({ id: 1, name: "Apple", attrs: ['fruit', 'red'] }),
    this.newRx({ id: 2, name: "Banana", attrs: ['fruit', 'yellow'] }),
    this.newRx({ id: 3, name: "Orange", attrs: ['fruit', 'orange'] }),
  ];

  selected = this.newRx<number>(null);

  protected getHTML(): string {
    return `
      <div>
        <div
          repeat="{{ root.items }}"
          class="block_inner mt_s"
          onclick="{{ root.select(this) }}"
          >
          <div>
            #{{ index }} —
            id: <b>{{ this::rx.id }}</b>,
            name: <b>{{ this::rx.attrs }}</b>
          </div>

          <div class="mt_s">
            <div repeat="{{ this::rx.attrs }}">
              <b>{{ index }}</b> · <b>{{ this }}</b>
            </div>
          </div>
        </div>

        <div class="mt_s">
          selected id: <b>{{ root.selected::rx }}</b>
        </div>
      </div>`;
  }

  select(item: Rx<any>) {
    this.selected.update(item.actual.id);
  }
}

componentsRegistryService.define(DemoRepeatComponent);
