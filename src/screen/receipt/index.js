import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import ZigzagView from 'react-native-zigzag-view';
import QRCode from 'react-native-qrcode-svg';

export default function Receipt({navigation, route}) {
  const {Data, time} = route.params;

  return (
    <View>
      <ZigzagView backgroundColor="#CCC" surfaceColor="#FFF">
        <Image source={require('../../asset/Logo.png')} style={styles.img} />
        <Text style={styles.title}>Nias Trip</Text>
        <Text style={styles.time}>{time}</Text>
        <View style={styles.wrap}>
          <Text style={styles.nama}>Guest : </Text>
          <Text style={styles.nama1}>{Data.Profile.name}</Text>
        </View>
        <Text style={styles.subhead}>Receipt</Text>
        <Text style={styles.caption}>{Data.data.Nama}</Text>
        <View style={styles.wrap2}>
          <Text style={styles.caption}>Jumlah</Text>
          <Text style={styles.caption}>{Data.jmlhOrg} Orang</Text>
        </View>
        <View style={styles.wrap2}>
          <Text style={styles.caption}>Check In</Text>
          <Text style={styles.caption}>{Data.checkIN}</Text>
        </View>
        <View style={styles.wrap2}>
          <Text style={styles.caption}>Check Out</Text>
          <Text style={styles.caption}>{Data.checkOUT}</Text>
        </View>
        <View style={styles.wrap2}>
          <Text style={styles.priceText}>Total</Text>
          <Text style={styles.priceText}>{Data.data.Harga}</Text>
        </View>
        <View style={styles.barcode}>
          <QRCode value={Data.orderId} size={120} />
        </View>
      </ZigzagView>
    </View>
  );
}

const styles = {
  img: {
    height: 100,
    width: 100,
    alignSelf: 'center',
    marginTop: 30,
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  time: {
    textAlign: 'center',
  },
  wrap: {display: 'flex', flexDirection: 'row'},
  nama: {
    marginTop: 20,
    fontSize: 20,
    color: 'black',
    marginLeft: 30,
  },
  nama1: {
    marginTop: 20,
    fontSize: 20,
    color: 'black',
    marginLeft: 10,
  },
  subhead: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  caption: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 10,
  },
  wrap2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: 10,
  },
  priceText: {
    fontSize: 20,
    color: 'black',
    marginTop: 10,
  },
  barcode: {
    alignSelf: 'center',
    padding: 30,
  },
};
