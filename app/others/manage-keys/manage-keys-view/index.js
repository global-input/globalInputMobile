import React, {useState, useEffect} from 'react';
import {Text, View, FlatList, TouchableHighlight, Image} from 'react-native';

import {styles} from '../styles';

import {images, menusConfig, manageKeysTextConfig} from '../../../configs';

import {ViewWithTabMenu, DisplayBlockText} from '../../../components';

import {appdata, formDataUtil} from '../../../store';
import GenerateNewKey from '../generate-new-key';
import EncryptionKeyItemImported from './EncryptionKeyItemImported';
import EncryptionKeyItemActivated from './EncryptionKeyItemActivated';
import ViewEncryptionKeyDetails from '../view-encryption-key-details';
import DeletingEncryptionKey from './DeletingEncryptionKey';
import PasswordInputView from '../password-input-view';

import {QRCodeView} from '../../../qr-code-view';
import ClipboardCopyView from '../../../clipboard-copy-view';
const ACT_TYPE = {
  LIST_KEYS: 1,
  GENERATE_NEW_KEY: 2,
  IMPORTING_KEY: 3,
  KEY_IMPORTED: 4,
  KEY_ACTIVATED: 5,
  VIEW_ITEM_DETAILS: 6,
  DELETING_KEY: 7,
  PASSWORD_FOR_QR_CODE: 8,
  DISPLAY_QR_CODE: 9,
  PASSWORD_FOR_CLIPBOARD: 10,
  DISPLAY_CLIPBOARD: 11,
  CLIPBOARD_COPY_COMPLETE: 12,
};
const createNewAction = () => {
  return {
    type: ACT_TYPE.LIST_KEYS,
    startIndex: 0,
    items: [],
    endReached: false,
    numberRocordsInBatch: 50,
    selectedEncryptionKeyItem: null,
    password: '',
  };
};
const populateItemsInAction = (action, encryptionKeyList) => {
  if (!encryptionKeyList) {
    console.log('encryptionKeyList is null');
    return;
  }
  for (var counter = 0; counter < action.numberRocordsInBatch; counter++) {
    if (action.startIndex >= encryptionKeyList.length) {
      action.endReached = true;
      break;
    }
    var encryptionKeyItem = encryptionKeyList[action.startIndex];
    action.items.push({
      encryptionKeyItem,
      key: encryptionKeyItem.encryptionKey,
    });
    action.startIndex++;
  }
};

const getStateFromProps = ({importDecryptedKey}) => {
  var encryptionKeyList = appdata.getEncryptionKeyList();
  var action = createNewAction();
  populateItemsInAction(action, encryptionKeyList);
  if (importDecryptedKey) {
    var matchedKeyItem =
      appdata.findEncryptionKeyByDecryptedValue(importDecryptedKey);
    if (matchedKeyItem) {
      action.selectedEncryptionKeyItem = matchedKeyItem;
      action.type = ACT_TYPE.VIEW_ITEM_DETAILS;
    } else {
      action.type = ACT_TYPE.IMPORTING_KEY;
    }
  }
  return action;
};

export default ({importDecryptedKey, menuItems, onBack}) => {
  const [action, setAction] = useState(() =>
    getStateFromProps({importDecryptedKey}),
  );

  const deleteEncryptionKeyItem = encryptionKeyItem => {
    appdata.deleteEncryptionKeyItem(encryptionKeyItem);
    toListView();
  };
  const onDeletingEncryptionKeyItem = selectedEncryptionKeyItem =>
    setAction({
      ...action,
      selectedEncryptionKeyItem,
      type: ACT_TYPE.DELETING_KEY,
    });
  const onQrCodeSelected = selectedEncryptionKeyItem =>
    setAction({
      ...action,
      selectedEncryptionKeyItem,
      type: ACT_TYPE.PASSWORD_FOR_QR_CODE,
    });

  const onClipboardCopySelected = selectedEncryptionKeyItem =>
    setAction({
      ...action,
      selectedEncryptionKeyItem,
      type: ACT_TYPE.PASSWORD_FOR_CLIPBOARD,
    });

  const toClipboardCopyComplete = () =>
    setAction({...action, type: ACT_TYPE.CLIPBOARD_COPY_COMPLETE});

  const onEndReached = () => {
    if (!action.endReached) {
      var encryptionKeyList = appdata.getEncryptionKeyList();
      populateItemsInAction(action, encryptionKeyList);
      setAction({...action});
    }
  };

  const onItemSelected = selectedItem => {
    const selectedEncryptionKeyItem = selectedItem.encryptionKeyItem;
    const type = ACT_TYPE.VIEW_ITEM_DETAILS;
    setAction({...action, selectedEncryptionKeyItem, type});
  };
  const toBackToItemDetails = () => {
    const type = ACT_TYPE.VIEW_ITEM_DETAILS;
    setAction({...action, type});
  };
  const onSelectGenerateNewKey = () => {
    const type = ACT_TYPE.GENERATE_NEW_KEY;
    setAction({...action, type});
  };
  const toListView = () => {
    const a = getStateFromProps({importDecryptedKey});
    action.type = ACT_TYPE.LIST_KEYS;
    setAction(a);
  };
  const importNewKey = (name, encryptionKey) => {
    const selectedEncryptionKeyItem = appdata.importNewKey(name, encryptionKey);
    const type = ACT_TYPE.KEY_IMPORTED;
    setAction({...action, selectedEncryptionKeyItem, type});
  };
  const displayQRCode = password => {
    const type = ACT_TYPE.DISPLAY_QR_CODE;
    setAction({...action, password, type});
  };
  const displayExportToCliboard = password => {
    const type = ACT_TYPE.DISPLAY_CLIPBOARD;
    setAction({...action, password, type});
  };
  const activateEncryptionKey = encryptionKey => {
    appdata.activateEncryptionKey(encryptionKey);
    const type = ACT_TYPE.KEY_ACTIVATED;
    setAction({...action, type});
  };
  const updateEncryptionKeyName = (encryptionKeyItem, newName) => {
    action.selectedEncryptionKeyItem.name = newName;
    appdata.updateEncryptionKey(action.selectedEncryptionKeyItem);
    setAction({...action});
  };
  const renderActiveIcon = encryptionKeyItem => {
    if (appdata.isEncryptionKeyIsActive(encryptionKeyItem)) {
      return <Image source={images.activeIcon} style={styles.itemIcon} />;
    } else {
      return null;
    }
  };
  const renderItemListItem = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => {
          onItemSelected(item);
        }}>
        <View style={styles.itemRecord}>
          <View style={styles.itemRow}>
            <View style={styles.listContainer}>
              <View style={styles.listvalue}>
                <Image source={images.key} style={styles.itemIcon} />
                <Text style={styles.keyText}>
                  {item.encryptionKeyItem.name}
                </Text>
              </View>
              {renderActiveIcon(item.encryptionKeyItem)}
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  };
  const renderListItems = () => {
    const defaultMemenus = [
      {
        menu: menusConfig.back.menu,
        onPress: onBack,
      },
    ];

    return (
      <ViewWithTabMenu
        menuItems={menuItems ? menuItems : defaultMemenus}
        selected={menusConfig.manageKeys.menu}
        title={manageKeysTextConfig.title}
        floatingButton={menusConfig.addRecord.menu}
        onPressFloatingIcon={onSelectGenerateNewKey}>
        <FlatList
          data={action.items}
          renderItem={renderItemListItem}
          onEndReached={onEndReached}
        />
        <View style={styles.content}>
          <DisplayBlockText content={manageKeysTextConfig.content} />
        </View>
      </ViewWithTabMenu>
    );
  };
  const renderGenerateNewKey = () => {
    return <GenerateNewKey onBack={toListView} importNewKey={importNewKey} />;
  };

  const renderImportingKey = () => {
    return (
      <GenerateNewKey
        onBack={toListView}
        importNewKey={importNewKey}
        importDecryptedKey={importDecryptedKey}
      />
    );
  };
  const renderEncryptionKeyImported = () => {
    return (
      <EncryptionKeyItemImported
        onBack={toListView}
        encryptionKeyItem={action.selectedEncryptionKeyItem}
        activateEncryptionKey={activateEncryptionKey}
        onQrCodeSelected={onQrCodeSelected}
        onClipboardCopySelected={onClipboardCopySelected}
      />
    );
  };
  const renderEncryptionKeyActivated = () => {
    return (
      <EncryptionKeyItemActivated
        onBack={toListView}
        encryptionKeyItem={action.selectedEncryptionKeyItem}
      />
    );
  };
  const renderViewItemDetails = () => {
    return (
      <ViewEncryptionKeyDetails
        onBack={toListView}
        encryptionKeyItem={action.selectedEncryptionKeyItem}
        activateEncryptionKey={activateEncryptionKey}
        updateEncryptionKeyName={updateEncryptionKeyName}
        onDeletingEncryptionKeyItem={onDeletingEncryptionKeyItem}
        onQrCodeSelected={onQrCodeSelected}
        onClipboardCopySelected={onClipboardCopySelected}
      />
    );
  };
  const renderDeletingEncryptionKey = () => {
    return (
      <DeletingEncryptionKey
        encryptionKeyItem={action.selectedEncryptionKeyItem}
        deleteEncryptionKey={deleteEncryptionKeyItem}
        onBack={toBackToItemDetails}
      />
    );
  };

  const renderPasswordForQRCode = () => {
    return (
      <PasswordInputView
        encryptionKeyItem={action.selectedEncryptionKeyItem}
        title={manageKeysTextConfig.export.qrcode.password.title}
        placeHolder={manageKeysTextConfig.export.qrcode.password.placeHolder}
        help1={manageKeysTextConfig.export.qrcode.password.content1}
        help2={manageKeysTextConfig.export.qrcode.password.content2}
        nextStep={displayQRCode}
        onBack={toBackToItemDetails}
      />
    );
  };
  const renderPasswordForClipboard = () => {
    return (
      <PasswordInputView
        encryptionKeyItem={action.selectedEncryptionKeyItem}
        title={manageKeysTextConfig.export.textContent.password.title}
        placeHolder={
          manageKeysTextConfig.export.textContent.password.placeHolder
        }
        help1={manageKeysTextConfig.export.textContent.password.content1}
        help2={manageKeysTextConfig.export.textContent.password.content2}
        nextStep={displayExportToCliboard}
        onBack={toBackToItemDetails}
      />
    );
  };
  const renderQRCode = () => {
    var encryptedContent = appdata.exportEncryptionKeyItemWithPassword(
      action.selectedEncryptionKeyItem,
      action.password,
    );
    if (!encryptedContent) {
      console.log('failed to decrypt the encryption key');
      return null;
    }
    const menuItems2 = [
      {},
      {
        menu: menusConfig.ok.menu,
        onPress: toListView,
      },
      {},
    ];
    var help2 = formDataUtil.buldTextContentResolved(
      action.selectedEncryptionKeyItem,
      manageKeysTextConfig.export.qrcode.content2,
    );
    return (
      <QRCodeView
        title={manageKeysTextConfig.export.qrcode.title}
        help={manageKeysTextConfig.export.qrcode.content}
        help2={help2}
        qrcodeContent={encryptedContent}
        menuItems={menuItems2}
      />
    );
  };
  const renderDisplayClipboardCopy = () => {
    var encryptedContent = appdata.exportEncryptionKeyItemAsText(
      action.selectedEncryptionKeyItem,
      action.password,
    );
    if (!encryptedContent) {
      console.log('failed to decrypt the encryption key');
      return null;
    }

    return (
      <ClipboardCopyView
        title={manageKeysTextConfig.export.textContent.clipboard.title}
        content1={manageKeysTextConfig.export.textContent.clipboard.content1}
        content2={manageKeysTextConfig.export.textContent.clipboard.content2}
        content={encryptedContent}
        onNextStep={toClipboardCopyComplete}
        onBack={toBackToItemDetails}
      />
    );
  };
  const renderClipboardCopyComplete = () => {
    const menuItems2 = [
      {},
      {
        menu: menusConfig.ok.menu,
        onPress: toListView,
      },
      {},
    ];
    var content = formDataUtil.buldTextContentResolved(
      action.selectedEncryptionKeyItem,
      manageKeysTextConfig.export.textContent.complete.content,
    );
    return (
      <ViewWithTabMenu
        title={manageKeysTextConfig.export.textContent.complete.title}
        content={content}
        menuItems={menuItems2}
      />
    );
  };

  useEffect(() => {
    setAction(getStateFromProps({importDecryptedKey}));
  }, [importDecryptedKey]);
  switch (action.type) {
    case ACT_TYPE.LIST_KEYS:
      return renderListItems();
    case ACT_TYPE.GENERATE_NEW_KEY:
      return renderGenerateNewKey();
    case ACT_TYPE.IMPORTING_KEY:
      return renderImportingKey();
    case ACT_TYPE.KEY_IMPORTED:
      return renderEncryptionKeyImported();
    case ACT_TYPE.KEY_ACTIVATED:
      return renderEncryptionKeyActivated();
    case ACT_TYPE.VIEW_ITEM_DETAILS:
      return renderViewItemDetails();
    case ACT_TYPE.DELETING_KEY:
      return renderDeletingEncryptionKey();
    case ACT_TYPE.PASSWORD_FOR_QR_CODE:
      return renderPasswordForQRCode();
    case ACT_TYPE.DISPLAY_QR_CODE:
      return renderQRCode();
    case ACT_TYPE.PASSWORD_FOR_CLIPBOARD:
      return renderPasswordForClipboard();
    case ACT_TYPE.DISPLAY_CLIPBOARD:
      return renderDisplayClipboardCopy();
    case ACT_TYPE.CLIPBOARD_COPY_COMPLETE:
      return renderClipboardCopyComplete();
    default:
      return null;
  }
};
