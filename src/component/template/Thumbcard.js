import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ThumbRating from '../atom/ThumbRating';

function trunctext(text) {
  return text.length > 13 ? `${text.substr(0, 13)}...` : text;
}

function Thumbcard({title, lokasi, gambar, onPress, rating}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{uri: gambar}} style={styles.img} />
        <ThumbRating
          colorText="white"
          colorIcon="yellow"
          marginTop={130}
          marginLeft={10}
          rating={rating}
        />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.inlineWrap}>
          <Icon name="location" size={15} color="#CB4335" />
          <Text style={styles.caption}>{lokasi}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function Byeditorcard({title, lokasi, gambar, onPress, rating}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{uri: gambar}} style={styles.img} />
        <View style={styles.badgeEditor}>
          <Icon name="flash" color="orange" size={14} />
          <Text style={styles.badgeText}>Oleh editor</Text>
        </View>
        <ThumbRating
          colorText="white"
          colorIcon="yellow"
          marginTop={130}
          marginLeft={10}
          rating={rating}
        />
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.inlineWrap}>
          <Icon name="location" size={15} color="#CB4335" />
          <Text style={styles.caption}>{trunctext(lokasi)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

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
  caption: {
    marginLeft: 5,
    color: 'white',
    fontSize: 12,
    fontWeight: '300',
    alignSelf: 'flex-start',
  },
  badgeEditor: {
    position: 'absolute',
    height: 25,
    width: 80,
    backgroundColor: '#f5f5f5',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    borderRadius: 5,
    paddingVertical: 3,
    marginLeft: 5,
    paddingHorizontal: 2,
  },
  badgeText: {
    color: 'grey',
    fontSize: 11,
  },
});

export {Byeditorcard};
export default React.memo(Thumbcard);
