import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function Btnsocial({onPress, source}) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onPress} style={styles.wrap2}>
        <Image
          source={require('../../asset/facebook.png')}
          style={styles.icon}
        />
        <Text style={[styles.txt, {color: 'white'}]}>
          Continue With Facebook
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 40,
    width: 300,
    backgroundColor: 'blue',
    elevation: 10,
    borderRadius: 40,
    alignSelf: 'center',
  },
  wrap2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txt: {marginRight: 55, marginTop: 8, fontSize: 15, fontWeight: 'bold'},
  icon: {height: 20, width: 20, marginTop: 10, marginLeft: 10},
});
