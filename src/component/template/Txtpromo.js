import {View, Text, TextInput, Pressable} from 'react-native';
import React from 'react';

export default function Txtpromo() {
  return (
    <View>
      <TextInput
        placeholder="Masukkan kode promo"
        placeholderTextColor="grey"
        style={{
          borderColor: 'black',
          borderWidth: 0.2,
          width: '95%',
          alignSelf: 'center',
          borderRadius: 5,
          paddingLeft: 10,
          position: 'absolute',
        }}
      />
      <Pressable
        style={{
          backgroundColor: '#FF5F7E',
          width: 100,
          padding: 8,
          borderRadius: 10,
          marginTop: 5,
          alignSelf: 'flex-end',
          marginRight: 20,
        }}>
        <Text style={{color: 'white', textAlign: 'center'}}>Gunakan</Text>
      </Pressable>
    </View>
  );
}
