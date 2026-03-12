import { componentsRegistryService } from 'cruzo';
import { AbstractIcon } from './abstract';

export class DraggableIcon extends AbstractIcon {
  static selector = "draggable-icon"  

  getHTML() {
    return `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" xml:space="preserve">
        <rect x="10" y="6" width="4" height="4"/>
        <rect x="18" y="6" width="4" height="4"/>
        <rect x="10" y="14" width="4" height="4"/>
        <rect x="18" y="14" width="4" height="4"/>
        <rect x="10" y="22" width="4" height="4"/>
        <rect x="18" y="22" width="4" height="4"/>
      </svg>`
  }
}

componentsRegistryService.define(DraggableIcon);