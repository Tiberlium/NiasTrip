import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Profile from '../../component/atom/Profile';
import {firebase} from '@react-native-firebase/auth';

export default function Account() {
  return <Text>Hallo bangasat</Text>;
}

const styles = StyleSheet.create({
  imageWrap: {
    alignSelf: 'center',
  },
});
