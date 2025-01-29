import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  Keyboard,
  Platform,
} from 'react-native';
import {styles, deviceDector} from './styles';
let SafeAreaContext;
try {
  SafeAreaContext = require('react-native-safe-area-context');
} catch (e) {
  // SafeArea context not available
}
export default class TabMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {keyboardshowing: null};
  }

  componentWillUnmount() {
    if (this.keyboardDidShowListener) {
      this.keyboardDidShowListener.remove();
      this.keyboardDidShowListener = null;
    }
    if (this.keyboardDidHideListener) {
      this.keyboardDidHideListener.remove();
      this.keyboardDidHideListener = null;
    }
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow.bind(this),
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide.bind(this),
    );
  }

  _keyboardDidShow(event) {
    var keyboardshowing = {
      height: event.endCoordinates.height,
    };
    this.setKeyboardShowing(keyboardshowing);
  }

  _keyboardDidHide() {
    this.setKeyboardShowing(null);
  }

  setKeyboardShowing(keyboardshowing) {
    this.setState({keyboardshowing});
  }

  renderMenuItem(menuItem, index) {
    var key = index + '_' + menuItem.menu.label;
    return (
      <MenuItem
        menu={menuItem.menu}
        onPress={menuItem.onPress}
        selected={this.props.selected}
        key={key}
      />
    );
  }

  getTabStyle() {
    let tab = styles.tab;
    if (deviceDector.isLandscapeMode()) {
      tab = styles.tabLandscape;
    }

    // Add extra padding for newer iOS devices
    if (Platform.OS === 'ios') {
      const additionalStyle = {
        paddingBottom: Platform.Version >= 11 ? 20 : 0,
        paddingLeft: 16,
        paddingRight: 16,
      };
      return [tab, additionalStyle];
    }

    return tab;
  }

  renderTab() {
    return (
      <View style={this.getTabStyle()} onLayout={this.layoutChanged.bind(this)}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}>
          {this.props.menuItems.map(this.renderMenuItem.bind(this))}
        </ScrollView>
      </View>
    );
  }

  layoutChanged(event) {
    if (event && event.nativeEvent && event.nativeEvent.layout) {
      this.forceUpdate();
    }
  }

  render() {
    if (this.state.keyboardshowing) {
      return null;
    } else {
      return this.renderTab();
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
      return <Text style={menuText}>{this.props.menu.label}</Text>;
    } else {
      return null;
    }
  }
  renderImage() {
    if (this.props.menu && this.props.menu.image) {
      var image = this.props.menu.image;
      if (
        this.props.menu.imageSelected &&
        this.props.selected === this.props.menu
      ) {
        image = this.props.menu.imageSelected;
      }
      return <Image source={image} />;
    } else {
      return null;
    }
  }
  render() {
    var iconContainerStyle = styles.iconcontainer;
    if (this.props.selected === this.props.menu) {
      iconContainerStyle = styles.iconcontainerSelected;
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
