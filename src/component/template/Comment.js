import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';

export default function Comment({comment, photoURI, name, rating}) {
  return (
    <View style={styles.parentContainer}>
      <View style={styles.container}>
        <Image source={{uri: photoURI}} style={styles.img} />
        <View>
          <Text style={styles.txt}>{name}</Text>
          <View style={styles.ratingwrap}>
            <Icon name="star" color="orange" size={15} />
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
    elevation: 5,
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
  img: {height: 50, width: 50, borderRadius: 25, marginRight: 10},
  inlineContainer: {display: 'flex', flexDirection: 'row'},
  txt: {color: 'grey', fontSize: 15, fontWeight: 'bold', marginVertical: 5},
  ratingwrap: {display: 'flex', flexDirection: 'row'},
  icontxt: {fontWeight: '500', fontSize: 12, color: 'black', marginLeft: 5},
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
