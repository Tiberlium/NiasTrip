import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {Btnsubmit, Cardheaderreceipt, Cardcallcenter} from '../../component';

export default function Receipt({route}) {
  const [nameicon, setnameicon] = React.useState('chevron-forward');
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
      <Cardheaderreceipt />
      <Collapse
        style={styles.collapse}
        onToggle={x =>
          x !== true
            ? setnameicon('chevron-forward')
            : setnameicon('chevron-down')
        }>
        <CollapseHeader style={styles.collapseheader}>
          <Text style={styles.transacttitletxt}>Detail Transaksi</Text>
          <Icon
            name={nameicon}
            size={20}
            color="black"
            style={styles.iconcollapse}
          />
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
      <Cardcallcenter />
      <Btnsubmit title="Selesai" top={20} />
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
  collapseheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconcollapse: {marginTop: 2, marginRight: 20},
  txttitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
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
    elevation: 5,
    paddingVertical: 20,
  },
});
