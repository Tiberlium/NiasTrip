import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SearchLogoBtn from '../atom/SearchLogoBtn';

export default function Searchbtn({onPress}) {
  return (
    <View>
      <TouchableOpacity style={styles.wrap} onPress={onPress}>
        <Text style={styles.label}>Cari Sesuatu</Text>
        <SearchLogoBtn />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: 350,
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding:5,
    borderRadius:15,
    backgroundColor:'#C4C4C4'
  },
  label:{fontSize:15,marginTop:10,color:'#3E3338',marginLeft:5}
});
