import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Receipt({route}) {
  const {guest, name, qty, checkin, checkout, timetransaction, total, orderId} =
    route.params;

  return (
    <View>
      <Icon
        name="checkmark-circle"
        size={30}
        color="#3EAF0A"
        style={styles.icon}
      />
      <Text style={styles.txt}>Pembayaran Berhasil</Text>
      <Text style={styles.txtprice}>Rp100.000</Text>
      <View style={styles.inlineContainer}>
        <Image source={require('../../asset/Logo.png')} style={styles.img} />
        <Text style={styles.txttitle}>Chipotle Grand Indonesia</Text>
        <View style={styles.wrap}>
          <Text style={styles.proptxt}>Nama Tamu</Text>
          <Text style={styles.valuetxt}>Jarvis</Text>
        </View>
        <View style={styles.wrap}>
          <Text style={styles.proptxt}>Pembayaran</Text>
          <Text style={styles.valuetxt}>Tempat Menginap</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {alignSelf: 'center'},
  txt: {
    color: '#3EAF0A',
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  txtprice: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  img: {height: 50, width: 50, alignSelf: 'center'},
  txttitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
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
  wrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  proptxt: {color: 'grey', fontSize: 15, fontWeight: '500'},
  valuetxt: {color: 'black', fontSize: 15, fontWeight: 'bold'},
});
