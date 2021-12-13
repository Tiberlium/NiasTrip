import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';

const Empty = () => {
  return (
    <View>
      <Image source={require('../../asset/bookmark.png')} style={styles.img} />
      <Text style={styles.txt}>Bookmark Kosong</Text>
    </View>
  );
};

export default function Bookmark() {
  return (
    <View>
      <Empty />
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
  txt: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
  },
});
