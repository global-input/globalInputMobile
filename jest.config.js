module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: ['node_modules/(?!.*react-native.*)'],
  setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
};
