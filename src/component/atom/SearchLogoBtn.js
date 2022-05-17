import React from 'react';
import {View, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchLogoBtn() {
  return (
    <View style={styles.wrap}>
      <Icon name="search-outline" size={20} color="white" style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {height: 35, width: 35, backgroundColor: '#FF5F7E', borderRadius: 10},
  icon: {alignSelf: 'center', marginTop: 7},
});
