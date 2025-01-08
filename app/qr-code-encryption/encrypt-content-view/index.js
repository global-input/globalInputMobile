import React, {useState} from 'react';
import {Text, View, Image, TouchableHighlight, FlatList} from 'react-native';

import {styles} from '../styles';

import {images, encryptedQrCodeTextConfig, menusConfig} from '../../configs';

import {
  EditorWithTabMenu,
  TextInputField,
  DisplayBlockText,
} from '../../components';

import {appdata} from '../../store';

const populateItemsInAction = (action, encryptionKeyList) => {
  if (!encryptionKeyList) {
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

const getStateFromProps = () => {
  var encryptionKeyList = appdata.getEncryptionKeyList();
  var activeEncryptionKey = appdata.getDecryptedActiveEncryptionKey();
  var selectedEncryptionKeyItem =
    appdata.findEncryptionKeyByDecryptedValue(activeEncryptionKey);
  var action = {
    content: '',
    errorMessage: '',
    startIndex: 0,
    items: [],
    endReached: false,
    numberRocordsInBatch: 50,
    selectedEncryptionKeyItem,
  };
  populateItemsInAction(action, encryptionKeyList);

  return action;
};
export default ({onContentEncrypted, menuItems, title, help}) => {
  const [action, setAction] = useState(() => getStateFromProps());

  const loadNextBatchOfItems = a => {
    var encryptionKeyList = appdata.getEncryptionKeyList();
    populateItemsInAction(a, encryptionKeyList);
    setAction({...a});
  };
  const onEndReached = () => {
    if (!action.endReached) {
      loadNextBatchOfItems(action);
    }
  };
  const onItemSelected = selectedItem =>
    setAction({
      ...action,
      selectedEncryptionKeyItem: selectedItem.encryptionKeyItem,
    });

  const setContent = content =>
    setAction({...action, content, errorMessage: ''});

  const setErrorMessage = errorMessage => setAction({...action, errorMessage});

  const onContentCompleted = () => {
    try {
      var content = action.content;
      if (!content) {
        setErrorMessage(
          encryptedQrCodeTextConfig.errorMessages.contentIsMissing,
        );
      } else {
        var encryptedContent = appdata.encryptWithAnEncryptionKey(
          content,
          action.selectedEncryptionKeyItem,
        );
        onContentEncrypted(
          encryptedContent,
          encryptedQrCodeTextConfig.qrcodeLabel,
        );
      }
    } catch (error) {
      console.log(error);
      setErrorMessage(
        encryptedQrCodeTextConfig.errorMessages.failedToEncrypt + error,
      );
    }
  };

  const renderErrorMessage = () => {
    if (action.errorMessage) {
      return (
        <View style={styles.inputContainer}>
          <Text style={styles.errorMessage}>{action.errorMessage}</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  const renderActiveIcon = encryptionKeyItem => {
    if (appdata.isEncryptionKeyIsActive(encryptionKeyItem)) {
      return <Image source={images.activeIcon} style={styles.itemIcon} />;
    } else {
      return null;
    }
  };

  const renderSelectIcon = encryptionKeyItem => {
    var icon = images.device.radio.unchecked;
    if (encryptionKeyItem === action.selectedEncryptionKeyItem) {
      icon = images.device.radio.checked;
    }
    return <Image source={icon} style={styles.itemIcon} />;
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
                {renderSelectIcon(item.encryptionKeyItem)}
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

  var menus = [...menuItems];
  menus.push({
    menu: menusConfig.encrypt.menu,
    onPress: onContentCompleted,
  });

  return (
    <EditorWithTabMenu
      title={title}
      menuItems={menus}
      selected={menusConfig.encryptedQrCode.menu}>
      <View style={styles.content}>
        <DisplayBlockText
          content={encryptedQrCodeTextConfig.enterContent.content}
        />

        <TextInputField
          labelIcon={images.messsage}
          placeholder={encryptedQrCodeTextConfig.placeHolder}
          value={action.content}
          secureTextEntry={false}
          onChangeTextValue={setContent}
          dark={true}
          autoCapitalize={'none'}
        />

        {renderErrorMessage()}
      </View>
      <View style={styles.content}>
        <DisplayBlockText
          content={encryptedQrCodeTextConfig.encryptionKey.content}
        />
        <FlatList
          data={action.items}
          renderItem={renderItemListItem}
          onEndReached={onEndReached}
        />
      </View>

      <DisplayBlockText content={help} />
    </EditorWithTabMenu>
  );
};
