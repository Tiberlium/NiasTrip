import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Btnback} from '../../component';

export default function About({navigation}) {
  return (
    <View>
      <Btnback onPress={() => navigation.goBack()} />
      <Image source={require('../../asset/Logo.png')} style={styles.image} />
      <Text style={styles.txt}>Tentang</Text>
      <Text style={styles.caption}>Nias trip v1.0 (Beta)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
