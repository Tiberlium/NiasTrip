import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Couponcard({potongan, kode}) {
  return (
    <View style={[styles.container]}>
      <Icon name="ticket-percent-outline" size={40} color="red" />
      <View style={styles.inlinewrap}>
        <Text style={styles.txt}>Diskon {potongan}%</Text>
        <Text style={styles.caption}>
          Gunakan kode{' '}
          <Text style={{fontWeight: 'bold', color: 'black'}}>{kode}</Text>{' '}
        </Text>
      </View>
    </View>
  );
}

export const Emptycouponcard = () => (
  <View style={[styles2.container]}>
    <Icon name="ticket-percent-outline" size={40} color="black" />
    <Text style={styles2.txt}>Promo belum tersedia</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15,
    elevation: 3,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  inlinewrap: {marginLeft: 20},
  txt: {color: 'black', fontWeight: '500'},
  caption: {color: 'grey', fontWeight: '400'},
});

const styles2 = StyleSheet.create({
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15,
    elevation: 3,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
  },
  txt: {color: 'black', fontWeight: '500', marginLeft: 20, marginTop: 10},
});
