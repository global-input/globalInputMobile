import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {styles} from './styles';

import {images, manageKeysTextConfig, menusConfig} from '../configs';

import {
  EditorWithTabMenu,
  TextInputField,
  DisplayBlockText,
} from '../components';

import {appdata} from '../store';
export default ({codedata, onEncryptionKeyDecrypted, onBack}) => {
  const [action, setAction] = useState({
    codedata,
    password: '',
    errorMessage: '',
  });
  const setPassword = password =>
    setAction({...action, password, errorMessage: ''});
  const setErrorMessage = errorMessage => setAction({...action, errorMessage});
  const decryptWithPassword = () => {
    var {password} = action;
    if (!password) {
      setErrorMessage(manageKeysTextConfig.errorMessages.passwordIsmissing);
    } else {
      try {
        var encryptionKeyDecrypted = appdata.decryptExportedEncryptionKey(
          codedata,
          password,
        );
        if (!encryptionKeyDecrypted) {
          setErrorMessage(manageKeysTextConfig.errorMessages.invalidPassword);
        } else {
          onEncryptionKeyDecrypted(encryptionKeyDecrypted);
        }
      } catch (error) {
        console.log(error);
        setErrorMessage(manageKeysTextConfig.errorMessages.invalidPassword);
      }
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
  const menuItems = [
    {
      menu: menusConfig.cancel.menu,
      onPress: onBack,
    },
    {
      menu: menusConfig.decrypt.menu,
      onPress: decryptWithPassword,
    },
  ];

  return (
    <EditorWithTabMenu
      title={manageKeysTextConfig.importKey.title}
      menuItems={menuItems}
      selected={menusConfig.eye.menu}>
      <DisplayBlockText content={manageKeysTextConfig.importKey.content} />

      <View style={styles.inputContainer}>
        <TextInputField
          labelIcon={images.passwordIcon}
          placeholder={manageKeysTextConfig.importKey.password.placeHolder}
          value={action.password}
          secureTextEntry={true}
          onChangeTextValue={setPassword}
          autoCapitalize={'none'}
        />
      </View>
      {renderErrorMessage()}

      <DisplayBlockText content={manageKeysTextConfig.importKey.content2} />
    </EditorWithTabMenu>
  );
};
