import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

export default function ThumbRating({
  colorText,
  marginTop,
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
      {!rating ? (
        <Text style={{color: 'black', fontStyle: 'italic'}}>
          Belum ada rating
        </Text>
      ) : (
        <View style={styles.inlineContainer}>
          <StarRating starSize={10} rating={rating} fullStarColor="orange" />
          <Text style={[styles.txt, {color: colorText}]}>{rating}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    position: 'absolute',
  },
  txt: {
    fontWeight: 'bold',
    fontSize: 12,
    marginLeft: 5,
    marginTop: -3,
  },
  inlineContainer: {display: 'flex', flexDirection: 'row'},
});
