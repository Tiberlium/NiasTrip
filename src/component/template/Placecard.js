import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function Placecard({title, kota, kabupaten}) {
  return (
    <View>
      <View style={styles.inlineWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.caption}>
          {kota},{kabupaten}
        </Text>
      </View>
    </View>
  );
}

function Placecard2({title, kota}) {
  return (
    <View>
      <View style={styles.inlineWrap}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.caption}>{kota}</Text>
      </View>
    </View>
  );
}

export {Placecard2};

const styles = StyleSheet.create({
  inlineWrap: {
    width: 250,
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    elevation: 5,
  },
  title: {color: 'black', fontWeight: 'bold', fontSize: 25},
  caption: {color: 'black', fontWeight: '300'},
});
