import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Alterrating({img, title, rating, caption, edit}) {
  return (
    <View style={styles2.container}>
      <>
        <Text style={styles2.title}>Ulasan Anda</Text>
        <View style={styles2.wrap}>
          <Image source={{uri: img}} style={styles2.img} />
          <View>
            <Text style={styles2.txt}>{title}</Text>
            <View style={styles2.inlineWrap}>
              <Icon name="star" color="orange" size={15} />
              <Text style={styles2.icontxt}>{rating}</Text>
            </View>
          </View>
        </View>
        <Text style={styles2.caption}>{caption}</Text>
      </>
      <>
        <Pressable onPress={edit} style={styles2.btncontainer}>
          <Text style={styles2.txtbutton}>Edit ulasan</Text>
        </Pressable>
      </>
    </View>
  );
}

const styles2 = StyleSheet.create({
  container: {
    width: 380,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
    paddingVertical: 10,
  },
  title: {
    fontWeight: '500',
    fontSize: 18,
    textAlign: 'center',
    color: 'black',
  },
  wrap: {display: 'flex', flexDirection: 'row'},
  img: {
    height: 50,
    width: 50,
    marginLeft: 15,
    borderRadius: 40,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  txt: {fontWeight: '500', color: 'black', fontSize: 13, marginTop: 15},
  icontxt: {color: 'black', fontWeight: 'bold', marginLeft: 5, fontSize: 12},
  inlineWrap: {display: 'flex', flexDirection: 'row', marginTop: 5},
  caption: {
    fontWeight: '300',
    color: 'black',
    width: 400,
    marginHorizontal: 20,
    fontSize: 14,
    width: 350,
  },
  txtbutton: {
    color: 'grey',
    marginTop: 5,
  },
  btncontainer: {
    height: 30,
    width: 120,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    borderRadius: 3,
    marginLeft: 20,
    paddingHorizontal: 10,
    justifyContent: 'space-around',
    borderWidth: 0.2,
    marginTop: 8,
  },
  btnicon: {marginTop: 5},
});
