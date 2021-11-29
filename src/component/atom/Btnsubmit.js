import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Btnsubmit({title,onPress}) {
  return (
    <View>
      <TouchableOpacity style={styles.wrap} onPress={onPress}>
        <Text style={styles.txt}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    wrap:{height:50,width:150,backgroundColor:'#FF5F7E',borderRadius:15,alignSelf:'center',marginTop:hp(5)},
    txt:{color:'white',fontSize:20,alignSelf:'center',marginTop:10}
})