import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Btnlogout({onPress}) {
  return (
    <View>
      <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Text style={styles.txt}>Keluar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btn: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 40,
    elevation:5,
  },
  txt: {fontSize: 20, color: 'red', marginTop: 10,textAlign:'center'},
});
