import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {TextInputField} from '../components';

const PasswordInputField = ({
  placeholder,
  value,
  onChangeTextValue,
  isVisible,
  onToggleVisibility,
  testID,
  autoCapitalize = 'none',
}) => {
  return (
    <View style={styles.container}>
      <TextInputField
        placeholder={placeholder}
        value={value}
        secureTextEntry={!isVisible}
        onChangeTextValue={onChangeTextValue}
        testID={testID}
        autoCapitalize={autoCapitalize}
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.toggleButton}
        onPress={onToggleVisibility}
        testID={`${testID}-toggle`}>
        <Text style={styles.toggleText}>{isVisible ? 'Hide' : 'Show'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
  },
  input: {
    flex: 1,
  },
  toggleButton: {
    position: 'absolute',
    right: 10,
    padding: 8,
  },
  toggleText: {
    color: '#4880ED',
    fontSize: 14,
  },
});

export default PasswordInputField;
