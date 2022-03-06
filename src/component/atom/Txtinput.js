import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
        value={value}
        secureTextEntry={secure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'center',
    width: 300,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    marginTop: hp(5),
  },
  label: {fontSize: 15, fontWeight: 'bold', color: 'black'},
});
