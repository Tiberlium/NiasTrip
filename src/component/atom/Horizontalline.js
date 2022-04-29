import {View, Text} from 'react-native';
import React from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';

export default function Horizontalline() {
  return (
    <View style={{paddingHorizontal: 40, marginTop: heightPercentageToDP(5)}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 0.2, backgroundColor: 'grey'}} />
        <View>
          <Text style={{width: 50, textAlign: 'center', color: 'grey'}}>
            Or
          </Text>
        </View>
        <View style={{flex: 1, height: 0.2, backgroundColor: 'grey'}} />
      </View>
    </View>
  );
}
