import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {Btnsubmit} from '../../component';

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
        <View style={styles.wrap}>
          <Text style={styles.proptxt}>Order id</Text>
          <Text style={styles.valuetxt}>xdgax0842xxjdm</Text>
        </View>
      </View>
      <Collapse style={styles.collapse}>
        <CollapseHeader>
          <Text style={styles.transacttitletxt}>Detail Transaksi</Text>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.wrap2}>
            <Text style={styles.proptxt}>Metode Pembayaran</Text>
            <Text style={styles.valuetxt}>Bca Klikpay</Text>
          </View>
          <View style={styles.wrap2}>
            <Text style={styles.proptxt}>Status</Text>
            <Text style={styles.valuetxt}>Selesai</Text>
          </View>
          <View style={styles.wrap2}>
            <Text style={styles.proptxt}>Check in</Text>
            <Text style={styles.valuetxt}>10/20/23</Text>
          </View>
          <View style={styles.wrap2}>
            <Text style={styles.proptxt}>Check out</Text>
            <Text style={styles.valuetxt}>10/20/23</Text>
          </View>
          <View style={styles.wrap2}>
            <Text style={styles.proptxt}>Waktu</Text>
            <Text style={styles.valuetxt}>20/20/2021 12:12:00</Text>
          </View>
          <View style={styles.wrap2}>
            <Text style={styles.proptxt}>Jumlah orang</Text>
            <Text style={styles.valuetxt}>4 orang</Text>
          </View>
          <View style={styles.wrap2}>
            <Text style={styles.proptxt}>Biaya per malam</Text>
            <Text style={styles.valuetxt}>Rp100.000</Text>
          </View>
           <View style={styles.wrap3}>
            <Text style={styles.proptxt}>Total Pembayaran</Text>
            <Text style={styles.valuetxt}>Rp200.000</Text>
          </View>
        </CollapseBody>
      </Collapse>
      <Btnsubmit title='Selesai' top={20}/>
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
    fontSize: 25,
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
  wrap2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
   wrap3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  transacttitletxt: {
    color: 'black',
    marginLeft: 20,
    fontWeight: 'bold',
    fontSize: 17,
  },
  proptxt: {color: 'grey', fontSize: 13, fontWeight: '400'},
  valuetxt: {color: 'black', fontSize: 13, fontWeight: 'bold'},
  collapse: {
    marginTop: 20,
    backgroundColor: 'white',
    elevation: 10,
    paddingVertical:20,
  },
});
