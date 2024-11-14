import React, {useState, useEffect} from 'react';
import {Text, View, Image} from 'react-native';

import {styles} from '../styles';

import {images, manageKeysTextConfig, menusConfig} from '../../../configs';

import {
  EditorWithTabMenu,
  IconButton,
  DisplayBlockText,
  TextInputField,
} from '../../../components';

import {generateRandomString} from '../../../store';

const getStateFromProps = ({importDecryptedKey, name}) => ({
  encryptionKey: importDecryptedKey
    ? importDecryptedKey
    : generateRandomString(23),
  name: name ? name : '',
  errorMessage: '',
});

export default ({importDecryptedKey, name, importNewKey, onBack}) => {
  const [compData, setCompData] = useState(() =>
    getStateFromProps({importDecryptedKey, name}),
  );

  const generateNewEncryptionKey = () =>
    setCompData({
      ...compData,
      encryptionKey: generateRandomString(23),
      errorMessage: '',
    });

  const onChangeName = name =>
    setCompData({...compData, name, errorMessage: ''});

  const onImportNewKey = () => {
    var name = compData.name.trim();
    if (!name) {
      setCompData({
        ...compData,
        errorMessage: manageKeysTextConfig.errorMessages.nameMissing,
      });
      return;
    }
    importNewKey(name, compData.encryptionKey);
  };
  const renderErrorMessage = () => {
    if (compData.errorMessage) {
      return (
        <View style={styles.errorMessageContainer}>
          <Text style={styles.errorMessage}>{compData.errorMessage}</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  const renderRandomButton = () => {
    if (importDecryptedKey) {
      return null;
    } else {
      return (
        <IconButton
          image={menusConfig.randomGenerator.menu.image}
          label={menusConfig.randomGenerator.menu.label}
          onPress={generateNewEncryptionKey}
        />
      );
    }
  };

  useEffect(() => {
    setCompData(getStateFromProps({importDecryptedKey, name}));
  }, [importDecryptedKey]);

  var menuItems = [
    {
      menu: menusConfig.cancel.menu,
      onPress: onBack,
    },
    {
      menu: menusConfig.importSingle.menu,
      onPress: onImportNewKey,
    },
  ];

  return (
    <EditorWithTabMenu
      title={manageKeysTextConfig.generateNewKey.title}
      menuItems={menuItems}
      selected={menusConfig.manageKeys.menu}>
      <View style={styles.keyFieldRow}>
        <View style={styles.keyvalueContainer}>
          <Image source={images.key} style={styles.itemIcon} />
          <Text style={styles.fieldValue}>{compData.encryptionKey}</Text>
        </View>
        {renderRandomButton()}
      </View>

      <View style={styles.nameFieldContainer}>
        <TextInputField
          placeholder={manageKeysTextConfig.nameField.placeHolder}
          value={compData.name}
          labelIcon={images.labelIcon}
          onChangeTextValue={onChangeName}
        />
      </View>
      {renderErrorMessage()}
      <View style={styles.helpContainer}>
        <DisplayBlockText
          content={manageKeysTextConfig.generateNewKey.content}
        />
      </View>
    </EditorWithTabMenu>
  );
};
