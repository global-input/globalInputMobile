import React from 'react';
import {Text, View, Image} from 'react-native';

import {styles} from '../styles';
import {images} from '../../../configs';
import {appdata, formDataUtil} from '../../../store';

export default ({encryptionKeyItem}) => {
  var decryptedKeyContent = appdata.decryptedWithPassword(
    encryptionKeyItem.encryptionKey,
  );
  var createdAt = formDataUtil.getDateString(encryptionKeyItem.createdAt);
  var name = encryptionKeyItem.name;
  return (
    <View style={styles.formContainer}>
      <View style={styles.itemRow}>
        <View style={styles.labelContainer}>
          <Image source={images.labelIcon} style={styles.itemIcon} />
        </View>
        <View style={styles.fieldValueContainer}>
          <Text style={styles.fieldValue}>{name}</Text>
        </View>
      </View>
      <View style={styles.itemRow}>
        <View style={styles.labelContainer}>
          <Image source={images.key} style={styles.itemIcon} />
        </View>
        <View style={styles.fieldValueContainer}>
          <Text style={styles.fieldValue}>{decryptedKeyContent}</Text>
        </View>
      </View>
      <View style={styles.itemRow}>
        <View style={styles.labelContainer}>
          <Image source={images.timestampIcon} style={styles.itemIcon} />
        </View>
        <View style={styles.fieldValueContainer}>
          <Text style={styles.fieldValue}>{createdAt}</Text>
        </View>
      </View>
    </View>
  );
};
