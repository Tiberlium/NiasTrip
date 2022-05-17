import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import ThumbRating from '../atom/ThumbRating';

function Thumbcard({title, lokasi, gambar, onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{uri: gambar}} style={styles.img} />
        <ThumbRating />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.inlineWrap}>
          <Icon name="location" size={15} color="red" />
          <Text style={styles.caption}>{lokasi}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(Thumbcard);

const styles = StyleSheet.create({
  container: {paddingLeft: 10, paddingTop: 10},
  img: {
    height: 200,
    width: 120,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    color: 'white',
    marginLeft: 10,
    marginTop: 150,
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginTop: 170,
    position: 'absolute',
  },
  caption: {marginLeft: 5, color: 'white', fontSize: 12, fontWeight: '300'},
});
