import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import SearchLogoBtn from '../atom/SearchLogoBtn';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';

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
    width: '90%',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderRadius: 10,
    backgroundColor: '#e5e5e5',
  },
  label: {fontSize: 13, marginTop: 9, color: '#636261', marginLeft: 5},
});
