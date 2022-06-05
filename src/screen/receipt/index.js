import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {Btnsubmit, Cardheaderreceipt, Cardcallcenter} from '../../component';

const Hoteltransact = ({
  Metode,
  checkin,
  checkout,
  waktu,
  jumlahorang,
  biaya,
  total,
}) => (
  <View>
    <View style={styles.wrap2}>
      <Text style={styles.proptxt}>Metode Pembayaran</Text>
      <Text style={styles.valuetxt}>{Metode}</Text>
    </View>
    <View style={styles.wrap2}>
      <Text style={styles.proptxt}>Status</Text>
      <Text style={styles.valuetxt}>Selesai</Text>
    </View>
    <View style={styles.wrap2}>
      <Text style={styles.proptxt}>Check in</Text>
      <Text style={styles.valuetxt}>{checkin}</Text>
    </View>
    <View style={styles.wrap2}>
      <Text style={styles.proptxt}>Check out</Text>
      <Text style={styles.valuetxt}>{checkout}</Text>
    </View>
    <View style={styles.wrap2}>
      <Text style={styles.proptxt}>Waktu</Text>
      <Text style={styles.valuetxt}>{waktu}</Text>
    </View>
    <View style={styles.wrap2}>
      <Text style={styles.proptxt}>Jumlah orang</Text>
      <Text style={styles.valuetxt}>{jumlahorang}</Text>
    </View>
    <View style={styles.wrap2}>
      <Text style={styles.proptxt}>Biaya per malam</Text>
      <Text style={styles.valuetxt}>Rp{biaya}</Text>
    </View>
    <View style={styles.wrap3}>
      <Text style={styles.proptxt}>Total Pembayaran</Text>
      <Text style={styles.valuetxt}>Rp{total}</Text>
    </View>
  </View>
);

const Eventtransact = ({metode, waktu, total}) => (
  <View>
    <View style={styles.wrap2}>
      <Text style={styles.proptxt}>Metode Pembayaran</Text>
      <Text style={styles.valuetxt}>{metode}</Text>
    </View>
    <View style={styles.wrap2}>
      <Text style={styles.proptxt}>Status</Text>
      <Text style={styles.valuetxt}>Selesai</Text>
    </View>
    <View style={styles.wrap2}>
      <Text style={styles.proptxt}>Waktu</Text>
      <Text style={styles.valuetxt}>{waktu}</Text>
    </View>
    <View style={styles.wrap3}>
      <Text style={styles.proptxt}>Total Pembayaran</Text>
      <Text style={styles.valuetxt}>Rp{total}</Text>
    </View>
  </View>
);

export default function Receipt({navigation, route}) {
  const [nameicon, setnameicon] = React.useState('chevron-forward');
  const {guest, name, qty, checkin, checkout, timetransaction, total, orderId} =
    route.params;

  return (
    <View>
      <View style={styles.wrapiconheader}>
        <Pressable
          onPress={() => navigation.navigate('Log')}
          style={styles.btnClose}>
          <Icon name="close" size={30} color="grey" />
        </Pressable>
        <Icon
          name="checkmark-circle"
          size={30}
          color="#3EAF0A"
          style={styles.icon}
        />
      </View>
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
          <Eventtransact />
        </CollapseBody>
      </Collapse>
      <Cardcallcenter />
      <Btnsubmit
        title="Selesai"
        top={20}
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapiconheader: {display: 'flex', flexDirection: 'row', marginTop: 10},
  btnClose: {marginLeft: 20},
  icon: {marginLeft: '35%'},
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
