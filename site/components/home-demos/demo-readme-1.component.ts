import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from './demo-readme-1.component.i18n.json'

export class DemoComponent extends AbstractComponent {
  static selector = "demo-component";

  lang$ = this.newRxFunc(() => i18nService.lang$.actual, i18nService.lang$);
  i18n$ = i18nService.connect(this, i18n);

  en_items$ = [
    this.newRx({ id: 1, name: "Apple", tags: ["fruit", "red"] }),
    this.newRx({ id: 2, name: "Banana", tags: ["fruit", "yellow"] }),
  ];
  ru_items = [
    this.newRx({ id: 1, name: "Яблоко", tags: ["фрукт", "красный"] }),
    this.newRx({ id: 2, name: "Банан", tags: ["фрукт", "желтый"] }),
  ]
  open$ = this.newRx(true);
  selected$ = this.newRx<number>(null);
  en_label$ = this.newRx("initial");
  ru_label$ = this.newRx("начальное значение");
  text$ = this.newRx("");

  updateLabel() {
    if (this.lang$.actual === "ru") {
      this.ru_label$.update("обновлено");
    } else {
      this.en_label$.update("updated");
    }
  }

  getHTML() {
    return `<div>
        <div>
          <input value="{{ root.text$::rx }}" oninput="{{ root.text$.update(event.target.value) }}" class="${UI_KIT}_input" />
          <div class="mt_s">{{ root.i18n$::rx.text }}: <b>{{ root.text$::rx }}</b></div>
        </div>

        <div class="block_inner">
          <button onclick="{{ root.updateLabel() }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary">{{ root.i18n$::rx.update }}</button>
          <div class="mt_s">
            <code class="description-inline-code">once::</code> <span>{{ root.lang$::rx === 'ru' ? root.ru_label$::rx : root.en_label$::rx }}</span>
          </div>
          <div class="mt_s">
            <code class="description-inline-code">::rx</code> <code>{{ root.lang$::rx === 'ru' ? root.ru_label$::rx : root.en_label$::rx }}</code>
          </div>
        </div>

        <div class="block_inner">
          <button onclick="{{ root.open$.update(!root.open$::rx) }}" class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary">{{ root.i18n$::rx.toggle }}</button>
          <div attached="{{ root.open$::rx }}" class="description-note">{{ root.i18n$::rx.info }}</div>
          <div class="mt_s">{{ root.i18n$::rx.open }}: <b>{{ root.open$::rx }}</b></div>
        </div>

        <div class="block_inner">
          <div repeat="{{ root.lang$::rx === 'ru' ? root.ru_items : root.en_items$ }}" class="description-note mt_s" onclick="{{ root.selected$.update(this::rx.id) }}"
            let-full="{{ this::rx.name + ' (' + (this::rx.tags.join(', ')) + ')' }}">
            <div>#{{ index }} — {{ root.i18n$::rx.name }}: <b>{{ this::rx.name }}</b></div>
            <div class="mt_s" repeat="{{ this::rx?.tags }}"><b>{{ index }}</b> · <b>{{ this }}</b></div>
            {{ root.i18n$::rx.full }}: <b>{{ full }}</b>
          </div>
          <div class="mt_s">{{ root.i18n$::rx.selected }}: <b>{{ root.selected$::rx }}</b></div>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoComponent);
