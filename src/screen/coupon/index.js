import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Btnback} from '../../component';

export default function Coupon({navigation}) {
  return (
    <View>
      <View style={styles.inlineWrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.txt}>Promo</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  txt: {fontSize: 25, fontWeight: '500', color: 'black', marginTop: 15},
});
