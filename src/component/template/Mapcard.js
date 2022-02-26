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
    width: 370,
    height: 180,
    backgroundColor: 'white',
    elevation: 10,
    alignSelf: 'center',
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'row',
    marginHorizontal: 10,
    elevation: 5,
    padding: 5,
  },
  img: {height: 150, width: 150, borderRadius: 15, margin: 10},
  wrap: {
    marginTop: 10,
    marginLeft: 5,
    height: 100,
    width: 200,
  },
  title: {fontWeight: 'bold', fontSize: 25, color: 'black', width: 180},
  caption: {fontWeight: '200', fontSize: 15, color: 'black', marginTop: 5},
});
