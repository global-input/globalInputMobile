import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

// Mock out AsyncStorage for all tests
jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);
