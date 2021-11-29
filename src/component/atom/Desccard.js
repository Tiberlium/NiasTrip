import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Desccard({title,kota,kabupaten}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Text style={styles.title}>{title}</Text>
        <Text>{kota}, {kabupaten}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 320,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    marginTop: 110,
  },
  wrap:{
      marginLeft:15,
      marginTop:10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
  },
  caption: {
    fontWeight: '200',
    fontSize: 15,
    color: 'black',
  },
});
