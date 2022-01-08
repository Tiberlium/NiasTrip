import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Btnbooking() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Pesan Sekarang</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: 200,
    backgroundColor: 'gray',
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
