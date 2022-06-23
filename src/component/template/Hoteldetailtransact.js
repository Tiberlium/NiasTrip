import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Hoteldetailtransact = ({
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
      <Text style={styles.valuetxt}>{biaya}</Text>
    </View>
    <View style={styles.wrap3}>
      <Text style={styles.proptxt}>Total Pembayaran</Text>
      <Text style={styles.valuetxt}>{total}</Text>
    </View>
  </View>
);

export default Hoteldetailtransact;

const styles = StyleSheet.create({
  wrap2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  proptxt: {color: 'grey', fontSize: 13, fontWeight: '400'},
  valuetxt: {color: 'black', fontSize: 13, fontWeight: 'bold'},
  wrap3: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
