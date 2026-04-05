import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoHtmlEventsComponent extends AbstractComponent {
  static selector = "demo-html-events-component";

  text = this.newRx("");
  lastKey = this.newRx("");
  checked = this.newRx(false);

  protected getHTML(): string {
    return `<div>
        <div class="mt_s">
          <input
            placeholder="Type here"
            value="{{ root.text::rx }}"
            oninput="{{ root.text.update(event.target.value) }}"
            onkeydown="{{ root.lastKey.update(event.key) }}"
            class="cruzo-ui-component_input"
            />
          <div class="ml_xs mt_s">
            <div>text: <b>{{ root.text::rx }}</b></div>
            <div>lastKey: <b>{{ root.lastKey::rx }}</b></div>
          </div>
        </div>

        <label class="cruzo-ui-component_checkbox mt_m">
          <input
            type="checkbox"
            class="cruzo-ui-component_checkbox-input"
            onchange="{{ root.checked.update(event.target.checked) }}"
            />
          <span>checked: <b>{{ root.checked::rx }}</b></span>
        </label>

        <div class="mt_s">
          <button onclick="{{ root.reset() }}" class="cruzo-ui-component_button cruzo-ui-component_button-s mb_s cruzo-ui-component_button-primary">
            Reset
          </button>
        </div>
      </div>`;
  }

  reset() {
    this.text.update("");
    this.lastKey.update("");
    this.checked.update(false);
  }
}

componentsRegistryService.define(DemoHtmlEventsComponent);
