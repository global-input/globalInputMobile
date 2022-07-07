import React from 'react';
import {View, TextInput} from 'react-native';
import  Clipboard from '@react-native-clipboard/clipboard';
import {styles} from './styles';
import {DisplayBlockText, ViewWithTabMenu} from '../components';
import {menusConfig} from '../configs';

export default ({
  content,
  onNextStep,
  onBack,
  title,
  selected,
  content1,
  content2,
  placeHolder
}) => {
  const onClipboardCopy = () => {    
    Clipboard.setString(content);
    onNextStep();
  };
  var menuItems = [
    {menu: menusConfig.back.menu, onPress: onBack},
    {menu: menusConfig.clipboardCopy.menu, onPress: onClipboardCopy}
  ];  
  return (
    <ViewWithTabMenu menuItems={menuItems} selected={selected} title={title}>
      <DisplayBlockText content={content1} />
      <View style={styles.itemRecord}>
        <TextInput
          style={styles.textarea}
          multiline={true}
          secureTextEntry={false}
          editable={false}
          value={content}
          numberOfLines={6}
          placeholder={placeHolder}
        />
      </View>

      <DisplayBlockText content={content2} />
    </ViewWithTabMenu>
  );
};
