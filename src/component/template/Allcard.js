import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Desccard from '../atom/Desccard';

export default function Allcard({title,kota,kabupaten,gambar}) {
  return (
    <View>
      <TouchableOpacity>
        <Image
          source={{uri: gambar}}
          style={styles.img}
        />
        <Desccard title={title} kota={kota} kabupaten={kabupaten}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {height: 200, width: 350, borderRadius: 20,alignSelf:'center',marginTop:10,position:'absolute'},
});
