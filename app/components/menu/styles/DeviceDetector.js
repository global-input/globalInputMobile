import {Dimensions, Platform} from 'react-native';
export default class DeviceDetector {
  DEVICE_TYPE = {
    OTHERS: 1,
    ANDROID: 2,
    IPAD: 3,
    IPHONE: 4,
    IPHONEX: 5,
  };
  constructor() {
    this.X_WIDTH = 375;
    this.X_HEIGHT = 812;
  }
  matchScreenSize(w, h) {
    return (
      (this.device.height === h && this.device.width === w) ||
      (this.device.height === w && this.device.width === h)
    );
  }

  getDevice() {
    if (this.device) {
      return this.device;
    }
    const {height, width} = Dimensions.get('window');
    this.device = {width, height};
    if (Platform.OS === 'android') {
      this.device.type = this.DEVICE_TYPE.ANDROID;
      return this.device;
    }
    if (Platform.OS !== 'ios') {
      this.device.type = this.DEVICE_TYPE.OTHERS;
      return this.device;
    }
    if (!height || !width) {
      this.device.type = this.DEVICE_TYPE.OTHERS;
      return this.device;
    }

    if (
      this.matchScreenSize(375, 812) ||
      this.matchScreenSize(414, 896) ||
      this.matchScreenSize(390, 844)
    ) {
      this.device.type = this.DEVICE_TYPE.IPHONEX;
      return this.device;
    }
    var aspectRatio = 0;
    if (width > height) {
      aspectRatio = width / height;
    } else {
      aspectRatio = height / width;
    }
    if (aspectRatio > 1.6) {
      this.device.type = this.DEVICE_TYPE.IPHONE;
    } else {
      this.device.type = this.DEVICE_TYPE.IPAD;
    }
    return this.device;
  }

  isIphone() {
    return this.getDevice().type === this.DEVICE_TYPE.IPHONE;
  }
  isIphoneX() {
    return this.getDevice().type === this.DEVICE_TYPE.IPHONEX;
  }
  isIPad() {
    return this.getDevice().type === this.DEVICE_TYPE.IPAD;
  }
  isLandscapeMode() {
    var windowDimensions = Dimensions.get('window');
    var windowsWidth = windowDimensions.width;
    var windowsHeight = windowDimensions.height;
    return windowsWidth > windowsHeight;
  }
  isLandScapeScreenWidthSmall() {
    var windowDimensions = Dimensions.get('window');
    var windowsWidth = windowDimensions.width;
    var windowsHeight = windowDimensions.height;
    return windowsWidth > windowsHeight && windowsWidth < 600;
  }
  getStaticDimension() {
    var windowDimensions = Dimensions.get('window');
    var windowsWidth = windowDimensions.width;
    var windowsHeight = windowDimensions.height;
    if (windowsWidth > windowsHeight) {
      return {
        width: windowsHeight,
        height: windowsWidth,
      };
    } else {
      return {
        width: windowsWidth,
        height: windowsHeight,
      };
    }
  }
  calculateMarkerSize() {
    var windowDimensions = Dimensions.get('window');
    var windowsWidth = windowDimensions.width;
    var windowsHeight = windowDimensions.height;
    var ws = windowsWidth;
    if (windowsHeight < ws) {
      ws = windowsHeight;
    }
    return Math.floor((ws * 250) / 320);
  }
  isAndroid() {
    return this.getDevice().type === this.DEVICE_TYPE.ANDROID;
  }
}
