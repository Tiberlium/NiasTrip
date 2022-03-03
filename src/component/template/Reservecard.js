import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';

export default function Reservecard({
  img,
  title,
  checkIn,
  CheckOut,
  jumlah,
  total,
  onPress,
}) {
  return (
    <View>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <View style={styles.inlineWrap}>
          <Image source={{uri: img}} style={styles.img} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text>
          {checkIn} / {CheckOut}
        </Text>
        <Text>{jumlah} orang</Text>
        <Text style={styles.price}>Rp {total}.000</Text>
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
    elevation: 5,
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
