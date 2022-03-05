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
        <Image
          source={{
            uri: gambar,
          }}
          style={styles.img}
        />
        <View style={styles.wrapBtn}>
          <TouchableOpacity onPress={onDelete}>
            <Icon name="bookmark" size={20} style={styles.icon} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.wraptxt}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.caption}>{kategori}</Text>
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
  wraptxt: {marginLeft: 40, position: 'absolute', marginTop: 90},
  wrapBtn: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 25,
    position: 'absolute',
    marginLeft: 40,
    marginTop: 30,
  },
  icon: {alignSelf: 'center', marginTop: 10},
  title: {fontWeight: 'bold', color: 'white', fontSize: 25},
  caption: {fontWeight: '300', color: 'white', fontSize: 15},
});
