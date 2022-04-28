import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';

export default function Custinput({onChangeText, placeholder, value}) {
  return (
    <View style={{backgroundColor: 'white', height: 100}}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        style={styles.txt}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    borderColor: 'black',
    borderWidth: 0.2,
    marginTop: 10,
    width: 300,
    alignSelf: 'center',
    borderRadius: 7,
  },
});
