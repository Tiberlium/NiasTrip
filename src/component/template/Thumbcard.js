import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

function Thumbcard({title, lokasi, gambar, onPress}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Image source={{uri: gambar}} style={styles.img} />
        <Text style={styles.title}>{title}</Text>
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
    height: 230,
    width: 150,
    borderRadius: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'white',
    marginLeft: 10,
    marginTop: 170,
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: 10,
    marginTop: 190,
    position: 'absolute',
  },
  caption: {marginLeft: 5, color: 'white', fontSize: 12, fontWeight: '300'},
});
