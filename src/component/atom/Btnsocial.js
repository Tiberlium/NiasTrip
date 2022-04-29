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
    height: 50,
    width: 300,
    elevation: 5,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 15,
    paddingTop: 5,
  },
  wrap2: {
    display: 'flex',
    flexDirection: 'row',
  },
  txt: {marginTop: 8, fontSize: 15, fontWeight: 'bold', marginHorizontal: 40},
  icon: {height: 20, width: 20, marginTop: 10, marginLeft: 10},
});
