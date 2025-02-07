import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  Keyboard,
  StatusBar,
  StyleSheet,
} from 'react-native';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {styles, deviceDector} from './styles';
import NotificationBar from './NotificationBar';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DisplayHeader from './DisplayHeader';

const TabWrapper = ({children, style, keyboardShowing}) => {
  const insets = useSafeAreaInsets();

  // Create dynamic styles outside JSX
  const dynamicStyles = StyleSheet.create({
    safeArea: {
      paddingBottom: keyboardShowing ? 0 : insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  });

  return <View style={[style, dynamicStyles.safeArea]}>{children}</View>;
};

export default class EditorWithTabMenu extends Component {
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
    this.setState(Object.assign({}, this.state, {keyboardshowing}));
  }

  renderMenuItem(menuItem, index) {
    var key = index + '_' + menuItem.label;
    return (
      <MenuItem
        menu={menuItem.menu}
        onPress={menuItem.onPress}
        selected={this.props.selected}
        key={key}
      />
    );
  }
  renderTitleIcon() {
    if (this.props.titleIcon) {
      return <Image source={this.props.titleIcon} style={styles.titleIcon} />;
    } else {
      return null;
    }
  }
  renderNotificationBar() {
    if (this.props.notificationMessage) {
      return <NotificationBar message={this.props.notificationMessage} />;
    } else {
      return null;
    }
  }

  renderHeader() {
    if (this.state.keyboardshowing) {
      return null;
    } else {
      return (
        <DisplayHeader
          title={this.props.title}
          titleIcon={this.props.titleIcon}
        />
      );
    }
  }
  renderTab() {
    if (this.state.keyboardshowing) {
      var tabOnTopStyle = styles.tabOnTop;
      if (deviceDector.isLandscapeMode()) {
        tabOnTopStyle = styles.tabOnTopLandscape;
      }

      return (
        <TabWrapper style={tabOnTopStyle} keyboardShowing={true}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.scrollContainer}>
            {this.props.menuItems.map(this.renderMenuItem.bind(this))}
          </ScrollView>
        </TabWrapper>
      );
    } else {
      var tab = styles.tab;
      if (deviceDector.isLandscapeMode()) {
        tab = styles.tabLandscape;
      }
      return (
        <TabWrapper style={tab} keyboardShowing={false}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.scrollContainer}>
            {this.props.menuItems.map(this.renderMenuItem.bind(this))}
          </ScrollView>
        </TabWrapper>
      );
    }
  }

  renderEnd() {
    if (this.state.keyboardshowing) {
      return <View style={styles.endSpaceWhenKeyboardShowing} />;
    } else {
      return <View style={styles.endSpaceWhenKeyboardHiding} />;
    }
  }
  render() {
    var contentContainerStyle = styles.contentContainer;
    if (deviceDector.isLandscapeMode()) {
      contentContainerStyle = styles.contentContainerLandscape;
    }
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: 'rgba(72,128,237,1)'}]}
        edges={['top', 'bottom']}>
        <StatusBar barStyle="light-content" />
        {this.renderHeader()}
        {this.renderTab()}
        {this.renderNotificationBar()}
        <KeyboardAwareScrollView
          extraScrollHeight={100}
          enableOnAndroid
          keyboardShouldPersistTaps="handled">
          <View style={contentContainerStyle}>{this.props.children}</View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
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
