import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry, keyboardType }) => {
  const { inputStyle, labelStyle, containerStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        style={inputStyle}
        keyboardType={keyboardType}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = {
  inputStyle: {
    color: '#000',
    paddingHorizontal: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2
  },

  labelStyle: {
    color: 'darkslategrey',
    fontSize: 18,
    paddingLeft: 10,
    flex: 1
  },

  containerStyle: {
    height: 50,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export default Input;
