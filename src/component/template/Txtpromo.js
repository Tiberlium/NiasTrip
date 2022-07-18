import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import React from 'react';

export default function Txtpromo({onChangeText, value, onpress, bg, label}) {
  return (
    <View>
      <TextInput
        placeholder="Masukkan kode promo"
        placeholderTextColor="grey"
        style={styles.txt}
        onChangeText={onChangeText}
        value={value}
      />
      <Pressable style={[styles.btn, {backgroundColor: bg}]} onPress={onpress}>
        <Text style={styles.btnlbl}>{label}</Text>
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
    color: 'black',
  },
  btn: {
    width: 100,
    padding: 8,
    borderRadius: 10,
    marginTop: 5,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  btnlbl: {textAlign: 'center', color: 'white'},
});
