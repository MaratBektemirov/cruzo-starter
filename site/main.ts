import "./css/font.css";
import "cruzo/ui-components/vars.css";
import "cruzo/ui-components/margin.css";
import "cruzo/ui-components/button.css";
import "cruzo/ui-components/checkbox.css";
import "./css/common.css";
import "./css/typography.css";
import "./css/fx.css";
import "./css/description.css";

import { Template, componentsRegistryService, routerService } from "cruzo";
routerService.setHashMode(true)

import "cruzo/ui-components/input.css";
import "cruzo/ui-components/button-group.css";
import "cruzo/ui-components/select.css";
import "cruzo/ui-components/spinner.css";
import "cruzo/ui-components/modal.css";
import "cruzo/ui-components/upload.css";

import "site/urls";
import "site/components/header/header.component";
import "site/components/sidebar/sidebar.component";
import "site/components/tests/tests.component";

function initApp() {
  Template.setAppVariables({});
  componentsRegistryService.initApp();
  routerService.update();
}

initApp();
