import {Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Btntiket({onPress}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Text style={styles.txt}>Dapatkan sekarang</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(5),
    width: wp(45),
    backgroundColor: '#FF5F7E',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
  },
  txt: {
    color: 'white',
    marginVertical: 9,
  },
});
