import {View, Text} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export default function Line() {
  return (
    <View
      style={{
        borderBottomColor: 'grey',
        borderBottomWidth: 0.2,
        marginHorizontal: 35,
        marginTop: heightPercentageToDP(5),
      }}
    />
  );
}
