import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Bookmarkcard({
  title,
  kategori,
  gambar,
  onPress,
  onDelete,
}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Image source={{uri: gambar}} style={styles.img} />
        <View style={styles.wrapParent}>
          <View style={styles.wraptxt}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.caption}>{kategori}</Text>
          </View>
          <View style={styles.wrapBtn}>
            <TouchableOpacity onPress={onDelete}>
              <Icon name="bookmark-outline" size={20} style={styles.icon} />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    height: 150,
    width: 350,
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: 20,
  },
  wrapParent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 85,
    position: 'absolute',
  },
  wraptxt: {marginLeft: 40},
  wrapBtn: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 25,
    marginTop: 10,
    marginLeft: 90,
  },
  icon: {alignSelf: 'center', marginTop: 10},
  title: {fontWeight: 'bold', color: 'white', fontSize: 25},
  caption: {fontWeight: '300', color: 'white', fontSize: 15},
});
