import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Alterrating({img, title, rating, caption, edit}) {
  return (
    <View>
      <Text style={styles2.title}>Ulasan Anda</Text>
      <View style={styles2.wrap}>
        <Image source={{uri: img}} style={styles2.img} />
        <View>
          <Text style={styles2.txt}>{title}</Text>
          <View style={styles2.inlineWrap}>
            <Icon name="star" color="orange" size={20} />
            <Text style={styles2.icontxt}>{rating}</Text>
          </View>
        </View>
      </View>
      <Text style={styles2.caption}>{caption}</Text>
      <Pressable onPress={edit}>
        <Text style={styles2.txtbutton}>Edit ulasan</Text>
      </Pressable>
    </View>
  );
}

const styles2 = StyleSheet.create({
  title: {
    fontWeight: '500',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  wrap: {display: 'flex', flexDirection: 'row'},
  img: {
    height: 60,
    width: 60,
    marginLeft: 15,
    borderRadius: 40,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  txt: {fontWeight: '500', color: 'black', fontSize: 15, marginTop: 15},
  icontxt: {color: 'black', fontWeight: 'bold', marginLeft: 5},
  inlineWrap: {display: 'flex', flexDirection: 'row', marginTop: 5},
  caption: {
    fontWeight: '300',
    color: 'black',
    width: 400,
    marginHorizontal: 20,
    fontSize:14,
  },
  txtbutton: {
    marginLeft: 20,
    color: '#5E8AC6',
    marginTop: 10,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
});
