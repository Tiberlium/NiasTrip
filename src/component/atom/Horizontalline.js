import {View, Text} from 'react-native';
import React from 'react';

export default function Horizontalline() {
  return (
    <View style={{paddingHorizontal: 30}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
        <View>
          <Text style={{width: 50, textAlign: 'center'}}>Or</Text>
        </View>
        <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
      </View>
    </View>
  );
}
