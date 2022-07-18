import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import React from 'react';

export default function Txtpromo({onChangeText, value, onpress}) {
  return (
    <View>
      <TextInput
        placeholder="Masukkan kode promo"
        placeholderTextColor="grey"
        style={styles.txt}
        onChangeText={onChangeText}
        value={value}
      />
      <Pressable style={styles.btn} onPress={onpress}>
        <Text style={styles.btnlbl}>Gunakan</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    borderColor: 'black',
    borderWidth: 0.2,
    width: '95%',
    alignSelf: 'center',
    borderRadius: 5,
    paddingLeft: 10,
    position: 'absolute',
    color:'black',
  },
  btn: {
    backgroundColor: '#FF5F7E',
    width: 100,
    padding: 8,
    borderRadius: 10,
    marginTop: 5,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  btnlbl: {color: 'white', textAlign: 'center'},
});
