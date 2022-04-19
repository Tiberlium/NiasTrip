import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function Btncheckpayment({onPress}) {
  return (
    <View>
      <Pressable style={styles.container} onPress={onPress}>
        <Text style={styles.text}>Dapatkan Receipt </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: wp(100),
    height: 50,
    backgroundColor: '#FF5F7E',
    paddingTop: 12,
  },
  text: {color: 'white', textAlign: 'center',fontSize:15},
});
