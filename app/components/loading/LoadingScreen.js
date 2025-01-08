import React, {Component} from 'react';
import {Text, View, ActivityIndicator} from 'react-native';
import {styles} from './styles';
import CancelButton from './CancelButton';
export default class LoadingScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <View style={styles.loadingMessageContainer}>
            <Text style={styles.loadingMessageText}>{this.props.message}</Text>
          </View>
          <ActivityIndicator size="large" />
          <CancelButton onCancel={this.props.onCancel} />
        </View>
      </View>
    );
  }
}
