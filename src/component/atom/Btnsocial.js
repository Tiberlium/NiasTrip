import React from 'react';
import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';

export default function Btnsocial({onPress, source}) {
  return (
    <View style={styles.wrap}>
      <TouchableOpacity onPress={onPress}>
        <Image source={source} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: 60,
    width: 60,
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 40,
  },
  icon: {height: 30, width: 30, alignSelf: 'center', marginTop: 15},
});
