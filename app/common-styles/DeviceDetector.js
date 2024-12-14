import {Dimensions, Platform} from 'react-native';
export default class DeviceDetector {
  constructor() {
    this.X_WIDTH = 375;
    this.X_HEIGHT = 812;
    this.isIphoneXCache = null;
  }

  isIphoneX() {
    if (this.isIphoneXCache) {
      return this.isIphoneXCache.isIphoneX;
    }
    const {height: D_HEIGHT, width: D_WIDTH} = Dimensions.get('window');
    this.isIphoneXCache = {
      isIphoneX:
        Platform.OS === 'ios' &&
        ((D_HEIGHT === this.X_HEIGHT && D_WIDTH === this.X_WIDTH) ||
          (D_HEIGHT === this.X_WIDTH && D_WIDTH === this.X_HEIGHT)),
    };
    return this.isIphoneXCache.isIphoneX;
  }
}
