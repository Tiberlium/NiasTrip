import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Btnback} from '../../component';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Commentscreen({navigation}) {
  return (
    <View>
      <View style={styles.wrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.headline}>Semua Komentar</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {display: 'flex', flexDirection: 'row', marginBottom: hp(3)},
  headline: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginTop: hp(2.5),
    marginHorizontal: wp(20),
  },
});
