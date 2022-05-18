import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Cardratingreview() {
  return (
    <View style={styles.container}>
      <Text style={styles.txt}>Rating & Review</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: hp(8),
    width: wp(90),
    alignSelf: 'center',
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#D4E0F2',
  },
  txt: {
    color: 'black',
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 18,
  },
});
