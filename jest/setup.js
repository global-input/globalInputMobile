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
}));

// 3. Mock 'react-native' by requiring the real module, then overriding pieces
jest.mock('react-native', () => {
  // Grab the actual 'react-native' module
  const RN = jest.requireActual('react-native');

  // --- Fix SettingsManager crash ---
  if (!RN.NativeModules.SettingsManager) {
    RN.NativeModules.SettingsManager = {};
  }

  // Provide a mock getConstants() so "Settings.ios.js:23:27" doesn't crash
  RN.NativeModules.SettingsManager.getConstants = jest.fn(() => ({}));

  // Provide default settings if your code checks them:
  RN.NativeModules.SettingsManager.settings = {
    AppleLocale: 'en_US',
    AppleLanguages: ['en'],
  };

  // Just in case your code calls setValues:
  RN.NativeModules.SettingsManager.setValues = jest.fn();

  // --- Mock AppState so addEventListener doesn't crash ---
  RN.AppState = {
    addEventListener: jest.fn(() => ({remove: jest.fn()})),
    removeEventListener: jest.fn(),
    currentState: 'active',
  };

  // --- Provide a mock version for Platform.constants.reactNativeVersion ---
  if (RN.Platform && RN.Platform.constants) {
    RN.Platform.constants.reactNativeVersion = {
      major: 0,
      minor: 74,
      patch: 0,
      prerelease: null,
    };
  }

  // Return a merged object so we keep real RN plus our overrides
  return {
    ...RN,

    NativeModules: {
      ...RN.NativeModules,
      // If you need to override more native modules, do it here
      SettingsManager: {
        ...RN.NativeModules.SettingsManager,
      },
    },

    AppState: {
      ...RN.AppState,
    },

    Platform: {
      ...RN.Platform,
    },
  };
});
