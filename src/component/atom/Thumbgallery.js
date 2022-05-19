import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function Thumbgallery({uri, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{uri: uri}} style={styles.img} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {paddingLeft: 20, paddingTop: 10, marginBottom: 10},
  img: {height: 70, width: 70, borderRadius: 10},
});
