import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Btndetail from '../atom/Btndetail';

function Mapcard({img, nama, kota, onPress}) {
  return (
    <View style={styles.container}>
      <Image source={{uri: img}} style={styles.img} />
      <View>
        <View style={styles.wrap}>
          <Text style={styles.title}>{nama}</Text>
          <Text style={styles.caption}>{kota}</Text>
        </View>
        <Btndetail onPress={onPress} />
      </View>
    </View>
  );
}

export default React.memo(Mapcard);

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 160,
    backgroundColor: 'white',
    elevation: 10,
    alignSelf: 'center',
    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    elevation: 5,
    padding: 5,
    marginBottom: 15,
  },
  img: {
    height: 140,
    width: 140,
    borderRadius: 10,
    marginLeft: 5,
    marginTop: 5,
    marginRight: 10,
  },
  wrap: {
    marginTop: 10,
    marginLeft: 5,
    height: 100,
    width: 200,
  },
  title: {fontWeight: 'bold', fontSize: 20, color: 'black', width: 180},
  caption: {fontWeight: '200', fontSize: 15, color: 'black', marginTop: 5},
});
