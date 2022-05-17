import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Subtitle({text1, text2}) {
  return (
    <View style={styles.container}>
      <Text style={styles.txt1}>{text1}</Text>
      <Text style={styles.txt2}>{text2}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: wp(5),
    marginTop: hp(3.2),
    marginBottom: hp(1),
  },
  txt1: {fontWeight: '500', fontSize: 17, color: 'black', marginRight: 5},
  txt2: {fontWeight: '300', fontSize: 17, color: 'black'},
});
