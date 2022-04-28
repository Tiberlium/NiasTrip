import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native';

export default function Btnsocial({
  onPress,
  source,
  background,
  txtcolor,
  label,
}) {
  return (
    <View style={[styles.wrap, {backgroundColor: background}]}>
      <TouchableOpacity onPress={onPress} style={styles.wrap2}>
        <Image source={source} style={styles.icon} />
        <Text style={[styles.txt, {color: txtcolor}]}>{label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 40,
    width: 300,
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
