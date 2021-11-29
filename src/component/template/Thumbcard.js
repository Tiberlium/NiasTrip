import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Thumbcard({title,lokasi,gambar}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={{uri: gambar}}
          style={styles.img}
        />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.inlineWrap}>
          <Icon name="location" size={20} color="red" />
          <Text style={styles.caption}>{lokasi}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {padding: 10},
  img: {height: 250, width: 170, borderRadius: 20, position: 'absolute'},
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginLeft:10,
    marginTop: 150,
  },
  inlineWrap:{display:'flex',flexDirection:'row',marginLeft:5,marginTop:10},
  caption: {marginLeft: 5, color: 'white', fontSize: 15, fontWeight: '300'},
});
