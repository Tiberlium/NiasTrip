import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';

export default function Txtinput({
  label,
  onChangeText,
  placeholder,
  value,
  secure,
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor="grey"
        value={value}
        secureTextEntry={secure}
        style={styles.txtinput}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'center',
    width: 300,
    marginVertical:10
  },
  label: {fontSize: 15, fontWeight: 'bold', color: 'black'},
  txtinput: {
    borderWidth: 0.2,
    borderColor: 'black',
    borderRadius: 5,
    marginTop: 5,
  },
});
