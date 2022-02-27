import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function Btncheckpayment({onPress}) {
  return (
    <View>
      <Pressable style={styles.container} onPress={onPress}>
        <Text style={styles.text}>Cek dan Selesaikan Pembayaran </Text>
        <Icon name="checkbox" size={30} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: 50,
    backgroundColor: '#4160FE',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 8,
  },
  text: {color: 'white', fontSize: 20},
});
