import {View, Text, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

export default function Btnhome({onPress}) {
  const navigation = useNavigation();
  return (
    <View>
      <Pressable onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={30} color="black" />
      </Pressable>
    </View>
  );
}
