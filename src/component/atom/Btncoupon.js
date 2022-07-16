import {Text, StyleSheet, Pressable, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function Btncoupon({onpress}) {
  return (
    <Pressable style={styles.btncontainer} onPress={onpress}>
      <View style={styles.inlinecontainer}>
        <Icon
          name="ticket-percent-outline"
          color={'red'}
          size={20}
          style={styles.firsticon}
        />
        <Text style={styles.txt}>Gunakan promo</Text>
      </View>
      <Icon
        name="chevron-right"
        color="black"
        size={20}
        style={styles.secondicon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btncontainer: {
    width: '90%',
    borderWidth: 0.2,
    alignSelf: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  inlinecontainer: {display: 'flex', flexDirection: 'row'},
  firsticon: {marginRight: 10},
  txt: {
    color: 'grey',
  },
});
