import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoComponent extends AbstractComponent {
  static selector = "demo-component";

  items$ = [
    this.newRx({ id: 1, name: "Apple", tags: ["fruit", "red"] }),
    this.newRx({ id: 2, name: "Banana", tags: ["fruit", "yellow"] }),
  ];
  open$ = this.newRx(true);
  selected$ = this.newRx<number>(null);
  label$ = this.newRx("initial");
  text$ = this.newRx("");

  getHTML() {
    return `<div>
        <div>
          <input value="{{ root.text$::rx }}" oninput="{{ root.text$.update(event.target.value) }}" class="input" />
          <div class="mt_s">text: <b>{{ root.text$::rx }}</b></div>
        </div>

        <div class="block_inner">
          <button onclick="{{ root.label$.update('updated') }}" class="btn btn_s btn-primary">Update</button>
          <div class="mt_s">
            <code class="description-inline-code">once::</code> <span>{{ once::root.label$::rx }}</span>
          </div>
          <div class="mt_s">
            <code class="description-inline-code">::rx</code> <code>{{ root.label$::rx }}</code>
          </div>
        </div>

        <div class="block_inner">
          <button onclick="{{ root.open$.update(!root.open$::rx) }}" class="btn btn_s btn-primary">Toggle</button>
          <div attached="{{ root.open$::rx }}" class="description-note">In DOM only when open</div>
          <div class="mt_s">open: <b>{{ root.open$::rx }}</b></div>
        </div>

        <div class="block_inner">
          <div repeat="{{ root.items$ }}" class="description-note mt_s" onclick="{{ root.selected$.update(this::rx.id) }}"
            let-full="{{ this::rx.name + ' (' + (this::rx.tags.join(', ')) + ')' }}">
            <div>#{{ index }} — name: <b>{{ this::rx.name }}</b></div>
            <div class="mt_s" repeat="{{ this::rx.tags }}"><b>{{ index }}</b> · <b>{{ this }}</b></div>
            full: <b>{{ full }}</b>
          </div>
          <div class="mt_s">selected: <b>{{ root.selected$::rx }}</b></div>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoComponent);
