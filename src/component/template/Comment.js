import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import StarRating from 'react-native-star-rating';

export default function Comment({comment, photoURI, name, rating}) {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <Image source={{uri: photoURI}} style={styles.img} />
        <View style={styles.inlineContainer}>
          <Text style={styles.txt}>{name}</Text>
          <View style={styles.ratingwrap}>
            <StarRating starSize={10} rating={rating} />
            <Text style={styles.icontxt}>{rating}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.txtComment}>{comment}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    marginVertical: 10,
    backgroundColor: 'white',
    elevation: 4,
    width: '90%',
    alignSelf: 'center',
    padding: 5,
    borderRadius: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  img: {height: 40, width: 40, borderRadius: 25, marginRight: 10},
  inlineContainer: {marginTop: -5},
  txt: {color: 'grey', fontSize: 15, fontWeight: 'bold', marginVertical: 5},
  ratingwrap: {display: 'flex', flexDirection: 'row'},
  icontxt: {
    fontWeight: '500',
    fontSize: 12,
    color: 'black',
    marginLeft: 5,
    marginTop: -3,
  },
  txtComment: {
    color: 'black',
    marginLeft: 24,
    width: '90%',
    fontWeight: '300',
    backgroundColor: '#EEE0DD',
    padding: 5,
    borderRadius: 10,
  },
});
