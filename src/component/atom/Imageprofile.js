import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default function Imageprofile({uri}) {
  return (
    <View>
      <Image source={{uri: uri}} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 80,
    width: 80,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 50,
  },
});
