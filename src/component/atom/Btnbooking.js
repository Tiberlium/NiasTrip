import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function Btnbooking({onPress}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>Pesan Sekarang</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 250,
    backgroundColor: '#425EF9',
    borderRadius: 10,
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
    paddingTop: 12,
  },
});
