import React, {Component} from 'react';
import {Text, View, ScrollView, Image, TouchableHighlight} from 'react-native';

import {styles} from './styles';

export default class DisplayLongDescriptionItem extends Component {
  render() {
    return (
      <View style={styles.item}>
        <View style={styles.itemIcon}>
          <TouchableHighlight onPress={this.props.onPress}>
            <Image source={this.props.image} />
          </TouchableHighlight>
        </View>
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.longTextContainer}>
            <Text>{this.props.description}</Text>
          </ScrollView>
        </View>
      </View>
    );
  }
}
