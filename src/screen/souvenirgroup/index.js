import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {Btnback} from '../../component';

export default function Souvenirgroup({navigation}) {
  return (
    <View>
      <View style={styles.inlineWrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.txt}>Souvenir</Text>
      </View>
      <Image source={require('../../asset/under.png')} style={styles.img} />
      <Text style={styles.txt1}>Coming Soon !!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 200,
    width: 200,
    alignSelf: 'center',
    marginTop: 150,
  },
  txt: {fontSize: 25, fontWeight: 'bold', color: 'black', marginTop: 15},
  inlineWrap: {display: 'flex', flexDirection: 'row'},
  txt1: {fontSize: 25, fontWeight: 'bold', color: 'black', textAlign: 'center'},
});
