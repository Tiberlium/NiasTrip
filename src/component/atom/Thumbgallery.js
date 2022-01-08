import React from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function Thumbgallery({source, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={source} style={styles.img} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {paddingLeft: 20, paddingTop: 10},
  img: {height: 70, width: 70, borderRadius: 10},
});
