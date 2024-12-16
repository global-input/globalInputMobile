import React, {Component} from 'react';
import {Text, View, TouchableHighlight} from 'react-native';
import {styles} from './styles';

export default class TextButton extends Component {
  onPress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }
  render() {
    var label = this.props.label;
    return (
      <TouchableHighlight onPress={this.onPress.bind(this)}>
        <View style={styles.buttonStyle}>
          <Text style={styles.button}>{label}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}
