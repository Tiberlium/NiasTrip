import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ThumbRating({
  colorText,
  marginTop,
  colorIcon,
  marginLeft,
  rating,
  marginBottom,
}) {
  return (
    <View
      style={[
        styles.container,
        {
          marginTop: marginTop,
          marginLeft: marginLeft,
          marginBottom: marginBottom,
        },
      ]}>
      <Icon name="star" size={15} color={colorIcon} />
      <Text style={[styles.txt, {color: colorText}]}>{rating}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 10,
    position: 'absolute',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 5,
    marginTop: 1,
  },
});
