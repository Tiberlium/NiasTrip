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
    width: 200,
    height: 50,
    borderRadius: 5,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: 40,
    borderWidth:0.2,
  },
  txt: {fontSize: 15, color: 'red', marginTop: 13,textAlign:'center'},
});
