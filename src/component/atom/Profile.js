import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

export default function Profile({source}) {
  return (
    <View>
      <Image source={source} style={styles.img} />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {height: 60, width: 60, borderRadius: 35},
});
