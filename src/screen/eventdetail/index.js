import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Image,
  Alert,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {
  Btnback,
  Btnbookmark2,
  Btntiket,
  Tiketpricelabel,
} from '../../component';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';

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

  function showFullDesc() {
    Alert.alert('Deskripsi', Data['Deskripsi']);
  }

  return (
    <View style={styles.container}>
      <>
        <Image source={{uri: Data.Gambar}} style={styles.img} />
        <View style={styles.wrapHeader}>
          <Btnback onPress={() => navigation.goBack()} />
          <Btnbookmark2 onPress={addBookmark} />
        </View>
        <View style={styles.inlineWrap}>
          <Text style={styles.title}>{Data.Nama}</Text>
          <Text style={styles.caption}>{Data.Kabupaten}</Text>
        </View>
        <Text style={styles.headline}>Deskripsi</Text>
        <Pressable onPress={showFullDesc}>
          <Text style={styles.subtitle} numberOfLines={3} ellipsizeMode="tail">
            {Data.Deskripsi}
          </Text>
        </Pressable>
        <View>
          <Text style={styles.mapTitle}>Lokasi</Text>
          <Pressable style={styles.mapContainer} onPress={() => alert('hallo')}>
            <MapView
              liteMode
              style={styles.map}
              region={{
                latitude: Number(Data['Latitude']),
                longitude: Number(Data['Longitude']),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: Number(Data['Latitude']),
                  longitude: Number(Data['Longitude']),
                }}
              />
            </MapView>
          </Pressable>
        </View>
      </>
      <>
        <View style={styles.wrapBtn}>
          {/* <Btnnearby
            title="Jelajahi Sekitar"
            onPress={() =>
              navigation.navigate('Map', {
                id: route.params.id,
                latitude: Data['Latitude'],
                longitude: Data['Longitude'],
              })
            }
          />
          <Btnbookmark onPress={addBookmark} color="black" /> */}
          <Tiketpricelabel harga={Data.Harga} />
          <Btntiket />
        </View>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  img: {
    height: 350,
    width: wp(100),
    alignSelf: 'center',
    position: 'absolute',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  mapContainer: {overflow: 'hidden', borderRadius: 20, alignSelf: 'center'},
  mapTitle: {
    fontWeight: '500',
    fontSize: 15,
    color: 'grey',
    marginLeft: 20,
    marginBottom: 10,
  },
  map: {
    height: hp(18),
    width: wp(90),
  },
  wrapHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inlineWrap: {
    marginTop: hp(40),
    marginLeft: 20,
  },
  title: {color: 'black', fontWeight: 'bold', fontSize: 25},
  caption: {color: 'black', fontWeight: '300'},
  headline: {
    color: '#808080',
    fontSize: 15,
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: -10,
  },
  subtitle: {
    padding: 20,
    color: 'black',
    fontWeight: '300',
  },
  wrapBtn: {
    borderTopWidth: 1,
    padding: 10,
    borderTopColor: '#C8C8C8',
    width: wp(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    marginTop: hp(2),
  },
});
