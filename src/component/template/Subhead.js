import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Btntext, Subtitle} from '..';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function Subhead({onPress}) {
  return (
    <View style={styles.container}>
      <Subtitle text1="Tempat" text2="Wisata" />
      <View style={styles.wrap}>
        <Btntext title="Lihat semua" color="#FF5F7E" onPress={onPress} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop:hp(3),
  },
  wrap: {
    marginTop: hp(3.5),
    marginRight: 20,
  },
});
