import {View, Text, Image, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Editordetail({url, title, desc}) {
  return (
    <Pressable style={styles.container}>
      <>
        <View style={styles.inlineContainer}>
          <Image source={{uri: url}} style={styles.img} />
          <View>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.wraplogo}>
              <Icon name="flash" size={15} color="white" />
              <Text style={styles.txticon}>By editor</Text>
            </View>
          </View>
        </View>
      </>
      <>
        <Text style={styles.subtitle}>Alasan Editor memilih ini :</Text>
        <Text style={styles.caption}>{desc}</Text>
      </>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 350,
    height: 250,
    borderWidth: 0.2,
    borderColor: 'grey',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'baseline',
    display: 'flex',
    flexDirection: 'column',
  },
  img: {height: 100, width: 150, borderRadius: 10, margin: 10},
  title: {color: 'black', fontWeight: 'bold', fontSize: 18, marginTop: 10},
  inlineContainer: {display: 'flex', flexDirection: 'row'},
  wraplogo: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#5FB3FE',
    padding: 5,
    borderRadius: 15,
    marginTop: 10,
    paddingHorizontal: 15,
  },
  txticon: {color: 'white', marginLeft: 10, marginVertical: 2, fontSize: 12},
  subtitle: {color: 'black', marginLeft: 10, fontWeight: 'bold', fontSize: 15},
  caption: {
    color: 'black',
    width: 350,
    fontSize: 13,
    padding: 10,
    alignSelf: 'flex-start',
  },
});
