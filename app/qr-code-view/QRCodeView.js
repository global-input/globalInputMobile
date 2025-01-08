import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import {styles} from './styles';

import {DisplayBlockText, ViewWithTabMenu} from '../components';

export default class QRCodeView extends Component {
  layoutChanged(event) {
    if (event && event.nativeEvent && event.nativeEvent.layout) {
      this.forceUpdate();
    }
  }
  render() {
    var {height, width} = Dimensions.get('window');
    if (width < height) {
      var qrsize = width - 20;
    } else {
      qrsize = height - 160;
    }

    return (
      <ViewWithTabMenu
        menuItems={this.props.menuItems}
        selected={this.props.selected}
        title={this.props.title}>
        <DisplayBlockText content={this.props.help} />
        <View
          style={styles.qrcodeContainer}
          onLayout={this.layoutChanged.bind(this)}>
          <QRCode
            value={this.props.qrcodeContent}
            size={qrsize}
            bgColor="black"
            fgColor="white"
          />
        </View>
        {this.renderHelp2()}
      </ViewWithTabMenu>
    );
  }

  renderHelp2() {
    if (this.props.help2) {
      return (
        <View style={styles.formContainer}>
          <DisplayBlockText content={this.props.help2} />
        </View>
      );
    } else {
      return null;
    }
  }
}
