import React, {Component} from 'react';
import {Text, View} from 'react-native';

import {styles} from './styles';

export default class DisplayBlockTitle extends Component {
  render() {
    return (
      <View style={styles.blockTitleContainer}>
        <Text style={styles.blockTitle}>{this.props.title}</Text>
      </View>
    );
  }
}
