import React, { Component } from 'react';
import {

  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  StatusBar
} from 'react-native';
import { styles, deviceDector } from "./styles";
import DisplayHeader from "./DisplayHeader";
import DisplayBlockText from "../display-text/DisplayBlockText";
import { LogBox } from 'react-native'



LogBox.ignoreLogs([
  'VirtualizedLists should never be nested', // TODO: Remove when fixed
]);
export default class ViewWithTabMenu extends Component {
  constructor(props) {
    super(props);
  }

  renderMenuItem(menuItem, index) {
    var key = index + "_" + menuItem.label;
    if (menuItem.menu) {
      return (
        <MenuItem menu={menuItem.menu} onPress={menuItem.onPress} selected={this.props.selected} key={key} />
      );
    }
    else {
      return (<View style={styles.menuItem} key={key}></View>)
    }

  }
  renderTitleIcon() {
    if (this.props.titleIcon) {
      return (<Image source={this.props.titleIcon} style={styles.titleIcon} />);
    }
    else {
      return null;
    }
  }
  renderHeader() {
    if (this.props.title) {
      return (
        <DisplayHeader title={this.props.title} titleIcon={this.props.titleIcon} />
      );
    }
    else if (this.props.header) {
      return this.props.header;
    }
    else {
      return null;
    }
  }
  renderTab() {
    var tab = styles.tab;
    if (deviceDector.isLandscapeMode()) {
      tab = styles.tabLandscape;
    }
    return (
      <View style={tab}>
        <ScrollView horizontal={true} contentContainerStyle={styles.scrollContainer}>
          {this.props.menuItems && this.props.menuItems.map(this.renderMenuItem.bind(this))}
        </ScrollView>
      </View>

    );
  }

  rendeFloatingIcon() {
    if (this.props.floatingButton && this.props.onPressFloatingIcon) {
      var iconStyle = styles.floatingIcon;
      if (deviceDector.isLandscapeMode()) {
        iconStyle = styles.floatingIconLandscape;
      }
      return (
        <TouchableHighlight onPress={this.props.onPressFloatingIcon} style={iconStyle}>
          <View style={styles.iconcontainer}>
            <Image source={this.props.floatingButton.image} />
          </View>
        </TouchableHighlight>
      );
    }
    else {
      return null;
    }
  }

  renderContent() {
    if (this.props.content) {
      return (
        <View style={styles.textBlockContainer}>
          <DisplayBlockText content={this.props.content} />
        </View>
      );
    }
    else if (this.props.message) {
      return this.renderMessage(this.props.message);
    }
    else {
      return null;
    }

  }
  renderMessage(message) {
    return (
      <View style={styles.messageWindowContainer}>
        <DisplayBlockText content={message} />
      </View>
    );
  }
  renderEnd() {
    return (
      <View style={styles.endSpaceWhenKeyboardHiding} />
    );

  }
  render() {
    var contentContainerStyle = styles.contentContainer;
    if (deviceDector.isLandscapeMode()) {
      contentContainerStyle = styles.contentContainerLandscape;
    }
    return (
      <View style={styles.container} onLayout={this.layoutChanged.bind(this)}>
        <StatusBar barStyle="light-content" />
        {this.renderHeader()}
        <View style={contentContainerStyle}>

          <ScrollView>
            {this.renderContent()}
            {this.props.children}
            {this.renderEnd()}
          </ScrollView>
        </View>
        {this.rendeFloatingIcon()}
        {this.renderTab()}
      </View>
    );
  }
  layoutChanged(event) {
    if (event && event.nativeEvent && event.nativeEvent.layout) {
      this.forceUpdate();
    }


  }

}




class MenuItem extends Component {

  renderLabel() {
    if (this.props.menu && this.props.menu.label) {
      var menuText = styles.menuText;
      if (this.props.selected === this.props.menu) {
        menuText = styles.menuTextSelected;
      }
      return (<Text style={menuText}>{this.props.menu.label}</Text>);
    }
    else {
      return null;
    }
  }
  renderImage() {
    if (this.props.menu && this.props.menu.image) {
      var image = this.props.menu.image;
      if (this.props.menu.imageSelected && this.props.selected === this.props.menu) {
        image = this.props.menu.imageSelected;
      }
      return (<Image source={image} />);
    }
    else {
      return null;
    }
  }
  render() {
    var iconContainerStyle = styles.iconcontainer;
    if (this.props.selected === this.props.menu) {
      iconContainerStyle = styles.iconcontainerSelected
    }
    return (
      <TouchableHighlight onPress={this.props.onPress} style={styles.menuItem}>
        <View style={iconContainerStyle}>
          {this.renderImage()}
          {this.renderLabel()}
        </View>
      </TouchableHighlight>
    );

  }

}
