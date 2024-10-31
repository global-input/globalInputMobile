import React from 'react';
import {View, Text, TouchableOpacity, Linking, Alert} from 'react-native';
import {styles} from './styles';
import {menusConfig} from '../configs';
import {ViewWithTabMenu} from '../components';

const HelpScreen = ({menuItems}) => {
  // Open the privacy policy URL safely
  const openPrivacyPolicy = () => {
    const url = 'https://globalinput.co.uk/global-input-app/privacy';
    Linking.openURL(url).catch(err => {
      console.error('Failed to open URL: ', err);
      Alert.alert(
        'Error',
        'Unable to open the privacy policy link. Please try again later.',
      );
    });
  };

  return (
    <ViewWithTabMenu
      title={'Global Input App'}
      menuItems={menuItems}
      selected={menusConfig.help.menu}>
      <View style={styles.content}>
        <Text style={styles.title}>Help & Support</Text>
        <Text style={styles.description}>
          This app allows you to store and manage confidential information on
          your mobile and use it to interact with various devices around you,
          leading to an array of useful features. When you are using computers,
          IoT devices, self-service machines, cloud services, or accessing
          company or public facilities, you can use your mobile to identify
          yourself, and then operate on them using your mobile.
        </Text>
        <Text style={styles.description}>
          You can see it in action by loading our product website{' '}
          <Text style={styles.link}>https://globalinput.co.uk/</Text> on a
          computer.
        </Text>
        <Text style={styles.description}>
          For more information on how we handle your data, please read our{' '}
          <TouchableOpacity
            onPress={openPrivacyPolicy}
            style={styles.linkContainer}>
            <Text style={styles.link}>Privacy Policy</Text>
          </TouchableOpacity>
          .
        </Text>
      </View>
    </ViewWithTabMenu>
  );
};

export default HelpScreen;
