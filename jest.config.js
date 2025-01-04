module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|react-native-camera' +
      '|@react-navigation' +
      '|react-native-keyboard-aware-scroll-view' +
      ')/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
};
