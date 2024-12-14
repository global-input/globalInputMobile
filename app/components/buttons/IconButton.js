import React, {Component} from 'react';
import {Text, View, Image, TouchableHighlight} from 'react-native';

import {styles} from './styles';

export default class IconButton extends Component {
  onPress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }
  renderLabel() {}
  renderImage() {
    if (this.props.image) {
      return <Image source={this.props.image} />;
    } else {
      return null;
    }
  }
  renderLabel() {
    if (this.props.label) {
      var labelStyle = styles.iconText;

      if (this.props.labelStyle === 'light') {
        labelStyle = styles.iconTextLight;
      }
      return <Text style={labelStyle}>{this.props.label}</Text>;
    } else {
      return null;
    }
  }
  render() {
    return (
      <View style={styles.topIconContainer}>
        <TouchableHighlight onPress={this.onPress.bind(this)}>
          <View style={styles.iconcontainer}>
            {this.renderImage()}
            {this.renderLabel()}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}
