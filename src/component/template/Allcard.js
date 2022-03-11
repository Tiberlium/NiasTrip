import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Desccard from '../atom/Desccard';
import {Desccard2} from '../atom/Desccard';

export default function Allcard({title, kota, kabupaten, gambar, onPress}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={{uri: gambar}} style={styles.img} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.caption}>
          {kota}, {kabupaten}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Allcard2({title, kategori, gambar, onPress}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={{uri: gambar}} style={styles.img} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.caption}>{kategori}</Text>
      </TouchableOpacity>
    </View>
  );
}

export {Allcard2};

const styles = StyleSheet.create({
  container: {
    height: 210,
    backgroundColor: 'white',
    width: 350,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    elevation: 4,
  },
  img: {
    height: 140,
    width: 350,
    borderRadius: 10,
  },
  descSet: {
    marginTop: -50,
  },
  title: {
    position: 'absolute',
    color: 'black',
    marginTop: 150,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
  caption: {
    position: 'absolute',
    color: 'black',
    marginTop: 178,
    fontWeight: '200',
    fontSize: 15,
    marginLeft: 10,
  },
});
