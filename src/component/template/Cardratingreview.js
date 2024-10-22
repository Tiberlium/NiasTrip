import {Text, StyleSheet, Image, Pressable, View} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Cardratingreview({onPress, marginTop}) {
  return (
    <Pressable
      style={[styles.container, {marginTop: marginTop}]}
      onPress={onPress}>
      <Image
        source={require('../../asset/peopleicon.png')}
        style={styles.img}
      />
      <Text style={styles.txt}>Rating & Ulasan</Text>
      <View style={styles.wrap}>
        <Icon
          name="chevron-forward"
          size={20}
          color="white"
          style={styles.icon}
        />
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    height: hp(8),
    width: wp(90),
    alignSelf: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#E8EDF5',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  img: {height: 40, width: 40, marginVertical: 5},
  txt: {
    color: 'grey',
    fontWeight: '400',
    marginVertical: 13,
  },
  icon: {
    alignSelf: 'center',
    marginTop: 4,
  },
  wrap: {
    width: 30,
    heigth: 30,
    backgroundColor: '#FF5F7E',
    borderRadius: 10,
    marginBottom: 15,
    marginLeft: 20,
    marginVertical: 10,
  },
});
