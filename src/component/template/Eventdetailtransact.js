import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Eventdetailtransact = ({metode, waktu, total}) => (
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

export default Eventdetailtransact;

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
});
