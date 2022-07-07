import React from 'react';
import { manageKeysTextConfig, menusConfig } from "../../../configs";
import { EditorWithTabMenu, DisplayBlockText } from "../../../components";
import DisplayKeyDetails from "./DisplayKeyDetails";
export default ({ encryptionKeyItem, onBack, onQrCodeSelected, onClipboardCopySelected }) => {

  const menuItems = [{
    menu: menusConfig.back.menu,
    onPress: onBack
  }, {
    menu: menusConfig.qrcode.menu,
    onPress: () => {
      onQrCodeSelected(encryptionKeyItem);
    }
  }, {
    menu: menusConfig.exportText.menu,
    onPress: () => {
      onClipboardCopySelected(encryptionKeyItem);
    }
  }];

  return (
    <EditorWithTabMenu title={manageKeysTextConfig.encryptionImported.title}
      menuItems={menuItems} selected={menusConfig.manageKeys.menu}>

      <DisplayKeyDetails encryptionKeyItem={encryptionKeyItem} />
      <DisplayBlockText content={manageKeysTextConfig.encryptionImported.content} />
    </EditorWithTabMenu>

  );
};

