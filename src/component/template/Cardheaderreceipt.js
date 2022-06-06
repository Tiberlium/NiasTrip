import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

export default function Cardheaderreceipt({nama, tamu, jenis, orderid}) {
  function trunctext(text) {
    return text.length > 20 ? `${text.substr(0, 20)}...` : text;
  }
  return (
    <View style={styles.inlineContainer}>
      <Image source={require('../../asset/Logo.png')} style={styles.img} />
      <Text style={styles.txttitle}>{nama}</Text>
      <View style={styles.wrap}>
        <Text style={styles.proptxt}>Nama Tamu</Text>
        <Text style={styles.valuetxt}>{tamu}</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.proptxt}>Pembayaran</Text>
        <Text style={styles.valuetxt}>{jenis}</Text>
      </View>
      <View style={styles.wrap}>
        <Text style={styles.proptxt}>Order id</Text>
        <Text style={styles.valuetxt}>{trunctext(orderid)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inlineContainer: {
    marginTop: 20,
    width: 350,
    alignSelf: 'center',
    backgroundColor: 'white',
    elevation: 10,
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  img: {height: 50, width: 50, alignSelf: 'center'},
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  valuetxt: {color: 'black', fontSize: 13, fontWeight: 'bold'},
  proptxt: {color: 'grey', fontSize: 13, fontWeight: '400'},
});
