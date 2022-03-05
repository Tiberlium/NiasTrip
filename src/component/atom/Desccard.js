import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Desccard({title, kota, kabupaten}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.txt}>
          {kota}, {kabupaten}
        </Text>
      </View>
    </View>
  );
}

function Desccard2({title, kategori}) {
  return (
    <View style={styles.container}>
      <View style={styles.wrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.txt}>{kategori}</Text>
      </View>
    </View>
  );
}

export {Desccard2};

const styles = StyleSheet.create({
  container: {
    height: 80,
    width: 320,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    marginTop: -50,
    marginBottom: 30,
  },
  wrap: {
    marginLeft: 15,
    marginTop: 10,
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
  txt: {
    color: 'black',
  },
});
