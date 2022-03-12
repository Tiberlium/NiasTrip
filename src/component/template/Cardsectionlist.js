import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Cardsectionlist({onPress, icon, title, desc}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Icon name={icon} size={30} color="#FF5F7E" style={styles.icon} />
      <View style={styles.wrap}>
        <Text style={styles.txt}>{title}</Text>
        <Text style={styles.caption}>{desc}</Text>
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
  icon: {padding: 20},
  wrap: {
    marginTop: 10,
  },
  txt: {color: 'black', fontWeight: '500', fontSize: 18},
  caption: {color: 'black', fontWeight: '300', fontSize: 14},
});
