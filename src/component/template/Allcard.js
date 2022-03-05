import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Desccard from '../atom/Desccard';
import {Desccard2} from '../atom/Desccard';

export default function Allcard({title, kota, kabupaten, gambar, onPress}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Image source={{uri: gambar}} style={styles.img} />
        <View style={styles.descSet}>
          <Desccard title={title} kota={kota} kabupaten={kabupaten} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

function Allcard2({title, kategori, gambar, onPress}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Image source={{uri: gambar}} style={styles.img} />
        <View style={styles.descSet}>
          <Desccard2 title={title} kategori={kategori} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export {Allcard2};

const styles = StyleSheet.create({
  img: {
    height: 200,
    width: 350,
    borderRadius: 20,
    alignSelf: 'center',
  },
  descSet: {
    marginTop: -50,
  },
});
