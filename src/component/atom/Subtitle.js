import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Subtitle({text1, text2}) {
  return (
    <View style={styles.container}>
      <Text style={styles.txt1}>{text1}</Text>
      <Text style={styles.txt2}>{text2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {display: 'flex', flexDirection: 'row', margin: 20},
  txt1: {fontWeight: 'bold', fontSize: 20, color: 'black', marginRight: 5},
  txt2: {fontWeight: '300', fontSize: 20, color: 'black'},
});
