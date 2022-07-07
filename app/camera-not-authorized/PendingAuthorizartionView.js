import React from 'react';


import { appTextConfig, menusConfig } from "../configs";

import { ViewWithTabMenu } from "../components";


export default ({ menuItems }) => (
  <ViewWithTabMenu
    title={appTextConfig.permissionPending.title}
    menuItems={menuItems} selected={menusConfig.eye.menu}
    content={appTextConfig.permissionPending.content} />
);
