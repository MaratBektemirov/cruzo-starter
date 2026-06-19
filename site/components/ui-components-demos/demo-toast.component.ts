import { AbstractComponent, componentsRegistryService } from "cruzo";
import { UI_KIT } from "cruzo/ui-components/const";
import { toastService } from "cruzo";
import type { ToastAlignX, ToastAlignY } from "cruzo/ui-components/toast";

export class DemoToastComponent extends AbstractComponent {
  static selector = "demo-toast-component";

  alignX$ = this.newRx<ToastAlignX>("center");
  alignY$ = this.newRx<ToastAlignY>("top");
  anchorMode$ = this.newRx<"element" | "default">("element");

  getHTML() {
    const k = UI_KIT;

    return `<div>
        <div class="mb_s">
          <div class="description-note mb_xs">anchor</div>
          <label class="${k}_checkbox mr_s">
            <input
              type="checkbox"
              class="${k}_checkbox-input"
              checked="{{root.anchorMode$::rx === 'element'}}"
              oninput="{{root.setAnchorMode('element')}}" />
            element
          </label>
          <label class="${k}_checkbox mr_s">
            <input
              type="checkbox"
              class="${k}_checkbox-input"
              checked="{{root.anchorMode$::rx === 'default'}}"
              oninput="{{root.setAnchorMode('default')}}" />
            default (page)
          </label>
        </div>

        <div class="mb_s">
          <div class="description-note mb_xs">alignX</div>
          <label class="${k}_checkbox mr_s">
            <input
              type="checkbox"
              class="${k}_checkbox-input"
              checked="{{root.alignX$::rx === 'left'}}"
              oninput="{{root.setAlignX('left')}}" />
            left
          </label>
          <label class="${k}_checkbox mr_s">
            <input
              type="checkbox"
              class="${k}_checkbox-input"
              checked="{{root.alignX$::rx === 'center'}}"
              oninput="{{root.setAlignX('center')}}" />
            center
          </label>
          <label class="${k}_checkbox">
            <input
              type="checkbox"
              class="${k}_checkbox-input"
              checked="{{root.alignX$::rx === 'right'}}"
              oninput="{{root.setAlignX('right')}}" />
            right
          </label>
        </div>

        <div class="mb_s">
          <div class="description-note mb_xs">alignY</div>
          <label class="${k}_checkbox mr_s">
            <input
              type="checkbox"
              class="${k}_checkbox-input"
              checked="{{root.alignY$::rx === 'top'}}"
              oninput="{{root.setAlignY('top')}}" />
            top
          </label>
          <label class="${k}_checkbox mr_s">
            <input
              type="checkbox"
              class="${k}_checkbox-input"
              checked="{{root.alignY$::rx === 'center'}}"
              oninput="{{root.setAlignY('center')}}" />
            center
          </label>
          <label class="${k}_checkbox">
            <input
              type="checkbox"
              class="${k}_checkbox-input"
              checked="{{root.alignY$::rx === 'bottom'}}"
              oninput="{{root.setAlignY('bottom')}}" />
            bottom
          </label>
        </div>

        <div class="demo-ui-css-classes_sizes">
          <div class="demo-ui-css-classes_slot">
            <button type="button"
              class="${k}_button ${k}_button-s ${k}_button-secondary"
              onclick="{{root.toastSuccess(event.currentTarget)}}">
              Success toast
            </button>
          </div>
          <div class="demo-ui-css-classes_slot">
            <button type="button"
              class="${k}_button ${k}_button-s ${k}_button-secondary"
              onclick="{{root.toastInfo(event.currentTarget)}}">
              Info toast
            </button>
          </div>
          <div class="demo-ui-css-classes_slot">
            <button type="button"
              class="${k}_button ${k}_button-s ${k}_button-secondary"
              onclick="{{root.toastError(event.currentTarget)}}">
              Error toast
            </button>
          </div>
        </div>
      </div>`;
  }

  setAlignX(v: ToastAlignX) {
    this.alignX$.update(v);
  }

  setAlignY(v: ToastAlignY) {
    this.alignY$.update(v);
  }

  setAnchorMode(v: "element" | "default") {
    this.anchorMode$.update(v);
  }

  private buildAnchorParams(el: Element) {
    const mode = this.anchorMode$.actual;
    const alignX = this.alignX$.actual;
    const alignY = this.alignY$.actual;

    if (mode === "element") return { element: el, alignX, alignY };
    return { alignX, alignY };
  }

  toastSuccess(el: Element) {
    toastService.show({
      kind: "success",
      title: "Saved",
      message: "All good.",
      ...this.buildAnchorParams(el),
    });
  }

  toastInfo(el: Element) {
    toastService.show({
      kind: "info",
      title: "Heads up",
      message: "Something happened.",
      ...this.buildAnchorParams(el),
    });
  }

  toastError(el: Element) {
    toastService.show({
      kind: "error",
      title: "Failed",
      message: "Try again later.",
      ...this.buildAnchorParams(el),
    });
  }
}

componentsRegistryService.define(DemoToastComponent);
