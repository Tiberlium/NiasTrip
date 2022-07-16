import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Couponcard() {
  return (
    <View style={styles.container}>
      <Icon name="ticket-percent-outline" size={40} color="green" />
      <View style={styles.inlinewrap}>
        <Text style={styles.txt}>Diskon Rp 40000</Text>
        <Text style={styles.caption}>Potongan tarif sebesar Rp 40000</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 15,
    elevation: 3,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
  },
  inlinewrap: {marginLeft: 20},
  txt: {color: 'black', fontWeight: '500'},
  caption: {color: 'grey', fontWeight: '400'},
});
