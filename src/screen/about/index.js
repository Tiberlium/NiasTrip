import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Btnback} from '../../component';

export default function About({navigation}) {
  return (
    <View>
      <View style={styles.wrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Tentang</Text>
      </View>
      <Image source={require('../../asset/Logo.png')} style={styles.image} />
      <Text style={styles.txt}>Tentang</Text>
      <Text style={styles.caption}>Nias trip v1.0 (Beta)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {display: 'flex', flexDirection: 'row'},
  title: {
    fontWeight: '500',
    fontSize: 20,
    color: 'black',
    marginTop: hp(2.5),
    marginHorizontal: wp(23),
  },
  image: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: hp(20),
  },
  txt: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  caption: {
    fontWeight: '300',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
  },
});
