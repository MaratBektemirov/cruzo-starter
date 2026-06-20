import "./css/font.css";
import "cruzo/ui-components/vars.css";
import "cruzo/ui-components/margin.css";
import "cruzo/ui-components/button.css";
import "cruzo/ui-components/checkbox.css";
import "./css/common.css";
import "./css/typography.css";
import "./css/fx.css";
import "./css/description.css";
import "./css/home-hero.css";
import "./css/code-block.css";
import "./css/docs-breadcrumbs.css";

import { Template, componentsRegistryService, routerService } from "cruzo";
routerService.setHashMode(true)

import "cruzo/ui-components/input.css";
import "cruzo/ui-components/textarea.css";
import "cruzo/ui-components/button-group.css";
import "cruzo/ui-components/select.css";
import "cruzo/ui-components/spinner.css";
import "cruzo/ui-components/modal.css";
import "cruzo/ui-components/upload.css";
import "cruzo/ui-components/toast.css";

import "site/urls";
import "site/components/header/header.component";
import "site/components/sidebar/sidebar.component";
import "site/components/tests/tests.component";
import "site/components/web3/web3.component";
import "site/components/router-demos/route-loading-overlay.component";
import "site/components/router-demos/demo-router-lazy.component";
import "site/components/code-copy-button/code-copy-button.component";

// UI components with side-effects (registration)
import "cruzo/ui-components/textarea";
import { ToastComponent } from "cruzo/ui-components/toast";

function initApp() {
  componentsRegistryService.define(ToastComponent);
  Template.setAppVariables({});
  componentsRegistryService.initApp();
  routerService.update();
}

initApp();
