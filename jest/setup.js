//
// jest/setup.js
//
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

// 1. Mock AsyncStorage
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

// 2. Inline mock for @react-native-clipboard/clipboard
jest.mock('@react-native-clipboard/clipboard', () => ({
  getString: jest.fn(() => Promise.resolve('mocked clipboard content')),
  setString: jest.fn(),
  hasString: jest.fn(() => Promise.resolve(true)),
  // Add more mocked methods if needed
}));

// 3. Partially mock 'react-native' by first importing the real module
const realRN = jest.requireActual('react-native');

// 3a. Override SettingsManager so it won't crash looking for a native module
if (!realRN.NativeModules.SettingsManager) {
  realRN.NativeModules.SettingsManager = {};
}
realRN.NativeModules.SettingsManager.settings = {
  AppleLocale: 'en_US',
  AppleLanguages: ['en'],
};
realRN.NativeModules.SettingsManager.setValues = jest.fn();

// 3b. Override AppState so addEventListener won't crash
realRN.AppState = {
  addEventListener: jest.fn(() => ({remove: jest.fn()})),
  removeEventListener: jest.fn(),
  currentState: 'active',
};

// 3c. Provide a mock version for Platform.constants.reactNativeVersion
if (realRN.Platform && realRN.Platform.constants) {
  realRN.Platform.constants.reactNativeVersion = {
    major: 0,
    minor: 74,
    patch: 0,
    prerelease: null,
  };
}

// 4. Finally, mock 'react-native' so Jest uses our modified version
jest.mock('react-native', () => realRN);
