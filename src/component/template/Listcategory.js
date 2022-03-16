import React from 'react';
import {View, StyleSheet} from 'react-native';
import Btncategory from '../atom/Btncategory';
import {useNavigation} from '@react-navigation/native';

export default function ListCategory() {
  const navigation = useNavigation();
  return (
    <View style={styles.wrap}>
      <Btncategory
        name="food"
        label="Makanan"
        color="orange"
        onPress={() => navigation.navigate('Makanangroup')}
      />
      <Btncategory
        name="bed"
        label="Homestay"
        color="blue"
        onPress={() => navigation.navigate('Hotelgroup')}
      />
      <Btncategory
        name="calendar"
        label="Event"
        color="red"
        onPress={() => navigation.navigate('Eventgroup')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {display: 'flex', flexDirection: 'row', justifyContent: 'space-around'},
});
