import {View, Text, Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

export default function Cardcallcenter() {
  const navigation = useNavigation();
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('Help')}>
      <Image
        source={require('../../asset/callcenter.png')}
        style={styles.img}
      />
      <View>
        <Text style={styles.title}>Butuh Bantuan</Text>
        <Text style={styles.caption}>Kunjungi Pusat Bantuan nias Trip</Text>
      </View>
      <Icon
        name="chevron-forward"
        color="black"
        size={25}
        style={styles.icon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    elevation: 5,
    padding: 20,
    marginTop: 10,
  },
  img: {
    height: 50,
    width: 50,
  },
  title: {fontWeight: 'bold', fontSize: 18, color: 'black'},
  caption: {fontWeight: '400', fontSize: 12, color: 'grey'},
  icon: {marginTop: 10},
});
