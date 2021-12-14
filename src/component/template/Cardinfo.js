import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Cardinfo() {
  return (
    <View style={styles.container}>
      <Text>Hallo bangsat</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    heigth: 150,
    borderWidth: 0.5,
    backgroundColor: 'white',
    borderRadius: 30,
    elevation: 5,
    alignSelf: 'center',
  },
});
