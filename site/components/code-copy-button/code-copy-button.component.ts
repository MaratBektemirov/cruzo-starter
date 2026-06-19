import styles from "./code-copy-button.component.module.css";

import { AbstractComponent, componentsRegistryService } from "cruzo";

export class CodeCopyButtonComponent extends AbstractComponent {
  static selector = "code-copy-button";

  label$ = this.newRx("Copy");

  getHTML() {
    return `<button type="button" class="${styles.button}" aria-label="Copy code" onclick="{{ root.copy() }}">
        <span>{{ root.label$::rx }}</span>
      </button>`;
  }

  copy() {
    const encoded = this.node.getAttribute("code");
    if (!encoded) return;

    const text = decodeURIComponent(encoded);
    const defaultLabel = "Copy";

    const showCopied = () => {
      this.label$.update("Copied");
      window.setTimeout(() => this.label$.update(defaultLabel), 1500);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(showCopied).catch(() => {});
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();

    try {
      if (document.execCommand("copy")) showCopied();
    } finally {
      textarea.remove();
    }
  }
}

componentsRegistryService.define(CodeCopyButtonComponent);
