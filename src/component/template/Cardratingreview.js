import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Cardratingreview({onPress}) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Image
        source={require('../../asset/peopleicon.png')}
        style={styles.img}
      />
      <Text style={styles.txt}>Rating & Review</Text>
      <Icon
        name="chevron-forward-circle-outline"
        size={25}
        color="grey"
        style={styles.icon}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    height: hp(8),
    width: wp(90),
    alignSelf: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#D4E0F2',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  img: {height: 40, width: 40},
  txt: {
    color: 'grey',
    fontWeight: '400',
    marginTop: 7,
  },
  icon: {
    marginTop: 5,
  },
});
