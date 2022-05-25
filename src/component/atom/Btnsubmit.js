import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Btnsubmit({title, onPress, top, bottom}) {
  return (
    <View>
      <TouchableOpacity
        style={[styles.wrap, {marginTop: top, marginBottom: bottom}]}
        onPress={onPress}>
        <Text style={styles.txt}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    height: hp(7),
    width: 300,
    backgroundColor: '#FF5F7E',
    borderRadius: 10,
    alignSelf: 'center',
  },
  txt: {color: 'white', fontSize: 18, alignSelf: 'center', marginVertical: 15},
});
