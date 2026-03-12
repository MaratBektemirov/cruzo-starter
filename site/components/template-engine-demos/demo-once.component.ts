import { AbstractComponent, componentsRegistryService } from "cruzo";

export class DemoOnceComponent extends AbstractComponent {
  static selector = "demo-once-component";

  label = this.newRx("значение при монтировании");

  protected getHTML(): string {
    return `<div>
        <p class="description-paragraph mb_s">
          <code class="description-inline-code">once::</code> — выражение выполняется и обновляется только один раз.
        </p>
        <button class="btn btn_s mb_s btn-primary" onclick="{{ root.label.update('после клика') }}">
          Обновить label
        </button>
        <div class="mb_s">
          <code class="description-inline-code">once::</code> <span>{{ once::root.label::rx }}</span>
        </div>
        <div class="mt_s">
          <code class="description-inline-code">::rx</code> <code>{{ root.label::rx }}</code>
        </div>
      </div>`;
  }
}

componentsRegistryService.define(DemoOnceComponent);
