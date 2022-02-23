import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';

export default function Reservecard() {
  return (
    <View>
      <TouchableOpacity style={styles.container}>
        <View style={styles.inlineWrap}>
          <Image
            source={{uri: 'https://placeimg.com/640/480/any'}}
            style={styles.img}
          />
          <Text style={styles.title}>Hotel Kaliki</Text>
        </View>
        <Text>25 november-24 november 2021</Text>
        <Text>2 orang</Text>
        <Text style={styles.price}>Rp.82.000</Text>
        <Text style={styles.footer}>Selesai</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 150,
    width: 350,
    alignSelf: 'center',
    backgroundColor: 'white',
    elevetion: 20,
    borderRadius: 15,
    padding: 15,
    margin: 10,
    borderWidth: 0.4,
  },
  inlineWrap: {display: 'flex', flexDirection: 'row'},
  img: {
    height: 40,
    width: 40,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginTop: 5,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    alignSelf: 'flex-end',
  },
  footer: {
    color: 'green',
    fontWeight: '300',
    marginTop: -20,
  },
});
