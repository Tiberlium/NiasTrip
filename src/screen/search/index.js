import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Btnback, Chip, Searchbar} from '../../component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Search({navigation}) {
  return (
    <View>
      <View style={styles.inlineWrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Pencarian</Text>
      </View>
      <Searchbar />
      <Text style={styles.subtitle}>Rekomendasi</Text>
      <View style={styles.chipWrap}>
        <Chip title="Lagundri" onPress={data => console.log(data)} />
        <Chip title="Ya'ahowu" onPress={data => console.log(data)} />
        <Chip title="Gado" onPress={data => console.log(data)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inlineWrap: {display: 'flex', flexDirection: 'row'},
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginTop: hp(2.5),
    marginLeft: wp(20),
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    margin: 20,
  },
  chipWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
});
