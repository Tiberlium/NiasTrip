import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {BtnNext} from '../../component';

export default function Intro({navigation}) {
  return (
    <View>
      <Image source={require('../../asset/Intro.png')} style={styles.img} />
      <View style={styles.inlinewrap}>
        <Text style={styles.title}>Bersiaplah Untuk Perjalanan Terbaikmu</Text>
        <Text style={styles.caption}>
          Keunikan Budaya,Tempat Surfing Dunia,101 Pantai Indah dan
          Bersih,Keramahan dan Souvenir Khas Nias
        </Text>
      </View>
      <View>
        <BtnNext onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    alignSelf: 'center',
    width: wp(100),
    height: hp(120),
    position: 'absolute',
  },
  inlinewrap: {marginTop: hp(55), paddingHorizontal: 15},
  title: {fontWeight: 'bold', fontSize: 30, color: 'white'},
  caption: {fontSize: 15, color: 'white', fontWeight: '300', marginTop: 10},
});
