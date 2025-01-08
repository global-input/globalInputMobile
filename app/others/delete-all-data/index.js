import React, {useState} from 'react';
import {Text, View} from 'react-native';

import {styles} from './styles';

import {settingsTextConfig, menusConfig} from '../../configs';

import {ViewWithTabMenu} from '../../components';

import {appdata} from '../../store';

const renderErrorMessage = errorMessage => {
  if (errorMessage) {
    return (
      <View style={styles.inputContainer}>
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      </View>
    );
  } else {
    return null;
  }
};
export default ({onBack}) => {
  const [errorMessage, setErrorMessage] = useState('');

  const onConfirmDeleteAllData = () => {
    appdata.clearAllForms();
    onBack();
  };
  const onCancel = () => {
    onBack();
  };
  const menuItems = [
    {
      menu: menusConfig.cancel.menu,
      onPress: onCancel,
    },
    {
      menu: menusConfig.confirm.menu,
      onPress: onConfirmDeleteAllData,
    },
  ];

  return (
    <ViewWithTabMenu
      title={settingsTextConfig.deleteAllData.title}
      menuItems={menuItems}
      selected={menusConfig.others.menu}
      content={settingsTextConfig.deleteAllData.content}>
      {renderErrorMessage(errorMessage)}
    </ViewWithTabMenu>
  );
};
