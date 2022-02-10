import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Btndetail from '../atom/Btndetail';

function Mapcard() {
  return (
    <View style={styles.container}>
      <Image
        source={{uri: 'https://placeimg.com/640/480/any'}}
        style={styles.img}
      />
      <View style={styles.wrap}>
        <Text style={styles.title}>Lagundri</Text>
        <Text style={styles.caption}>Teluk dalam, Nias Selatan</Text>
        <Btndetail />
      </View>
    </View>
  );
}
export default React.memo(Mapcard);

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 150,
    backgroundColor: 'white',
    elevation: 10,
    alignSelf: 'center',
    borderRadius: 15,
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
  },
  img: {height: 120, width: 120, borderRadius: 15, margin: 10},
  wrap: {marginTop: 10, marginLeft: 5},
  title: {fontWeight: 'bold', fontSize: 25, color: 'black'},
  caption: {fontWeight: '200', fontSize: 15, color: 'black'},
});
