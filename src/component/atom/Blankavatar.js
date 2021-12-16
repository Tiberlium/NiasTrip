import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default function Blankavatar({height, width,upDown}) {
  return (
    <View>
      <Image
        source={require('../../asset/blankavatar.png')}
        style={[styles.img, {height: height, width: width,marginVertical:upDown}]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    alignSelf: 'center',
  },
});
