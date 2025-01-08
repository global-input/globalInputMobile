import React from 'react';

import {manageKeysTextConfig, menusConfig} from '../../../configs';

import {ViewWithTabMenu, DisplayBlockText} from '../../../components';

import DisplayKeyDetails from './DisplayKeyDetails';

export default ({onBack, encryptionKeyItem}) => {
  var menuItems = [
    {},
    {
      menu: menusConfig.ok.menu,
      onPress: onBack,
    },
    {},
  ];
  return (
    <ViewWithTabMenu
      menuItems={menuItems}
      title={manageKeysTextConfig.encryptionActivated.title}
      selected={menusConfig.manageKeys.menu}>
      <DisplayKeyDetails encryptionKeyItem={encryptionKeyItem} />
      <DisplayBlockText
        content={manageKeysTextConfig.encryptionActivated.content}
      />
    </ViewWithTabMenu>
  );
};
