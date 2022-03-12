import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Cardsectionlist() {
  return (
    <Pressable style={styles.container}>
      <Icon name="info" size={30} color="black" style={styles.icon} />
      <View style={styles.wrap}>
        <Text style={styles.txt}>Cardsectionlist</Text>
        <Text style={styles.caption}>lorem ipsum dolor charge</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(10),
    width: wp(100),
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {padding: 15},
  wrap: {
    marginTop: 10,
  },
  txt: {color: 'black', fontWeight: 'bold', fontSize: 18},
  caption: {color: 'black', fontWeight: '300', fontSize: 14},
});
