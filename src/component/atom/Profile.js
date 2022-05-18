import React from 'react';
import {View, Image, StyleSheet} from 'react-native';

export default function Profile({source}) {
  return (
    <View>
      <Image source={source} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {height: 50, width: 50, borderRadius: 35, marginTop: 5},
});
