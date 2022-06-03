import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function Emptycomment() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Komentar Kosong</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {marginVertical: 25},
  txt: {color: 'grey', textAlign: 'center'},
});
