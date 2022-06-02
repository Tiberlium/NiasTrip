import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';

export default function Commentheader({onPress}) {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Komentar</Text>
      <Pressable onPress={onPress}>
        <Text style={styles.txtbutton}>lihat semua</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  txt: {color: 'black', fontSize: 16, fontWeight: 'bold'},
  txtbutton: {color: 'blue', fontSize: 14},
});
