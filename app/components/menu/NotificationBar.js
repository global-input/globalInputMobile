import React, {Component} from 'react';
import {View} from 'react-native';
import {styles} from './styles';
import NotificationText from '../display-text/NotificationText';
export default class NotificationBar extends Component {
  render() {
    if (this.props.message) {
      return (
        <View style={styles.notificationBar}>
          <NotificationText message={this.props.message} />
        </View>
      );
    } else {
      return null;
    }
  }
}
