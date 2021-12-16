import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

export default function Blankavatar({height, width, upDown,label}) {
  return (
    <View style={{marginVertical: upDown}}>
      <Image
        source={require('../../asset/blankavatar.png')}
        style={[styles.img, {height: height, width: width}]}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    alignSelf: 'center',
  },
  label: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
  },
});
