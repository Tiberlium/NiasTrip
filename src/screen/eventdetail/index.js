import {View, Text, StyleSheet, ToastAndroid, Image} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {Btnback, Btnnearby, Btnbookmark} from '../../component';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Eventdetail({navigation, route}) {
  const [Data, setData] = useState({});
  const isMounted = useRef();

  async function Get() {
    const docRef = await firestore()
      .collection('Event')
      .doc(route.params.id)
      .get();
    if (isMounted.current) return setData(docRef.data());
  }

  useEffect(() => {
    isMounted.current = true;
    Get();
    return () => (isMounted.current = false);
  }, []);

  function addBookmark() {
    const value = {
      id: route.params.id,
      title: Data['Nama'],
      gambar: Data['Gambar'],
      kategori: Data['Kategori'],
    };

    AsyncStorage.getItem('Book').then(doc => {
      doc = doc === null ? [] : JSON.parse(doc);
      doc.push(value);
      return AsyncStorage.setItem('Book', JSON.stringify(doc));
    });
    ToastAndroid.show('Ditambahkan ke Bookmark', ToastAndroid.SHORT);
  }

  return (
    <View style={styles.container}>
      <Image source={{uri: Data.Gambar}} style={styles.img} />
      <Btnback onPress={() => navigation.goBack()} />
      <View style={styles.inlineWrap}>
        <Text style={styles.title}>{Data.Nama}</Text>
        <Text style={styles.caption}>{Data.Kabupaten}</Text>
      </View>
      <Text style={styles.headline}>Deskripsi</Text>
      <Text style={styles.subtitle} numberOfLines={5} ellipsizeMode="tail">
        {Data.Deskripsi}
      </Text>
      <View style={styles.wrapBtn}>
        <Btnnearby
          title="Jelajahi Sekitar"
          onPress={() =>
            navigation.navigate('Map', {
              id: route.params.id,
              latitude: Data['Latitude'],
              longitude: Data['Longitude'],
            })
          }
        />
        <Btnbookmark onPress={addBookmark} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1},
  containerImage: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  img: {
    height: 300,
    width: wp(100),
    alignSelf: 'center',
    position: 'absolute',
  },
  inlineWrap: {
    width: 250,
    height: 100,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: hp(24),
    elevation: 5,
    padding: 10,
  },
  title: {color: 'black', fontWeight: 'bold', fontSize: 25},
  caption: {color: 'black', fontWeight: '300'},
  headline: {
    color: 'black',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    padding: 20,
    color: 'black',
    fontWeight: '300',
  },
  wrapBtn: {
    marginTop: hp(89),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    alignSelf: 'center',
  },
});
