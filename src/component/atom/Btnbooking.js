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
    height: 50,
    width: 250,
    backgroundColor: '#FF5F7E',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
    paddingTop: 15,
  },
});
