import { AbstractComponent, componentsRegistryService, i18nService } from "cruzo"
import { UI_KIT } from "cruzo/ui-components/const"
import i18n from "./demo-repeat-key.component.i18n.json"

type RepeatItem = {
  id: number
  name: string
}

export class DemoRepeatKeyRowComponent extends AbstractComponent {
  static selector = "demo-repeat-key-row-component"

  i18n$ = i18nService.connect(this, i18n)
  clicks$ = this.newRx(0)

  getHTML() {
    return `<div class="fx" style="align-items:center;gap:8px">
        <span>{{ root.i18n$::rx.clicks }}: <b>{{ root.clicks$::rx }}</b></span>
        <button
          type="button"
          class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary"
          onclick="{{ root.clicks$.update(root.clicks$::rx + 1) }}">+1</button>
      </div>`
  }
}

export class DemoRepeatKeyComponent extends AbstractComponent {
  static selector = "demo-repeat-key-component"

  dependencies = new Set([DemoRepeatKeyRowComponent.selector])

  i18n$ = i18nService.connect(this, i18n)

  items$ = this.newRx<RepeatItem[]>([
    { id: 1, name: "Apple" },
    { id: 2, name: "Banana" },
    { id: 3, name: "Orange" },
  ])

  refresh() {
    this.items$.update(this.items$.actual.map((item) => ({ ...item })))
  }

  shuffle() {
    this.items$.update([...this.items$.actual].reverse())
  }

  getHTML() {
    return `<div>
        <div class="fx mb_s">
          <button
            type="button"
            class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-primary mr_s"
            onclick="{{ root.refresh() }}">{{ root.i18n$::rx.refresh }}</button>
          <button
            type="button"
            class="${UI_KIT}_button ${UI_KIT}_button-s ${UI_KIT}_button-secondary"
            onclick="{{ root.shuffle() }}">{{ root.i18n$::rx.shuffle }}</button>
        </div>

        <div class="fx fx-mobile-wrap" style="gap:16px">
          <div class="block_inner" style="flex:1">
            <div class="description-note mb_s">{{ root.i18n$::rx.withoutKey }}</div>
            <div repeat="{{ root.items$::rx }}" class="mb_s">
              <div class="mb_xs"><b>#{{ this.id }}</b> {{ this.name }}</div>
              <demo-repeat-key-row-component></demo-repeat-key-row-component>
            </div>
          </div>

          <div class="block_inner" style="flex:1">
            <div class="description-note mb_s">{{ root.i18n$::rx.withKey }}</div>
            <div repeat="{{ root.items$::rx }}" repeat-key="{{ this.id }}" class="mb_s">
              <div class="mb_xs"><b>#{{ this.id }}</b> {{ this.name }}</div>
              <demo-repeat-key-row-component></demo-repeat-key-row-component>
            </div>
          </div>
        </div>
      </div>`
  }
}

componentsRegistryService.define(DemoRepeatKeyRowComponent)
componentsRegistryService.define(DemoRepeatKeyComponent)
