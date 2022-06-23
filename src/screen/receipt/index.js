import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {
  Btnsubmit,
  Cardheaderreceipt,
  Cardcallcenter,
  Eventdetailtransact,
  Hoteldetailtransact,
} from '../../component';

export default function Receipt({navigation, route}) {
  const [nameicon, setnameicon] = React.useState('chevron-forward');
  const {
    guest,
    nama,
    qty,
    checkin,
    checkout,
    timetransaction,
    total,
    orderid,
    jenis,
    metode,
    tarif,
  } = route.params;

  function formatRupiah(uang) {
    return new Intl.NumberFormat('ID-id', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(uang);
  }

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
      <Text style={styles.txtprice}>{formatRupiah(total)}</Text>
      <Cardheaderreceipt
        nama={nama}
        tamu={guest}
        jenis={jenis}
        orderid={orderid}
      />
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
          {jenis === 'Penginapan' ? (
            <Hoteldetailtransact
              Metode={metode}
              checkin={checkin}
              checkout={checkout}
              waktu={timetransaction}
              jumlahorang={qty}
              biaya={tarif}
              total={total}
            />
          ) : (
            <Eventdetailtransact
              metode={metode}
              waktu={timetransaction}
              total={total}
            />
          )}
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
