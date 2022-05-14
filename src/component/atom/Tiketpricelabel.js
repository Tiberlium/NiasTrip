import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function Tiketpricelabel({harga}) {
  return (
    <View>
      <Text style={styles.caption}>Harga tiket</Text>
      <Text style={styles.mainFont}>Rp {harga}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  caption: {color: 'grey', fontSize: 12},
  mainFont: {color: 'black', fontSize: 20, fontWeight: 'bold', marginTop: 4},
});
