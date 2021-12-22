import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Empty = () => {
  return (
    <View>
      <Image source={require('../../asset/order.png')} style={styles.img} />
      <Text style={styles.txt}>Belum ada reservasi</Text>
    </View>
  );
};

export default function Log() {
  return (
    <View>
      <Empty />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginTop: 150,
  },
  txt: {
    textAlign: 'center',
    fontSize: 20,
    color: 'black',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
