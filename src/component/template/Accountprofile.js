import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function Accountprofile({uri, name}) {
  return (
    <View>
      <Image source={{uri: uri}} style={styles.image} />
      <Text style={styles.txt}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 50,
    position:'absolute',
  },
  icon: {alignSelf: 'center', marginTop: 130, marginLeft: 90},
  txt: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    marginTop: 160,
    marginBottom: 50,
  },
});
