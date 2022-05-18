import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ToastAndroid,
  Pressable,
  Alert,
  ScrollView,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Btnback,
  Btnbookmark,
  Btnnearby,
  Thumbgallery,
  Cardratingreview,
} from '../../component';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Detail({route, navigation}) {
  const [visible, setvisible] = useState(false);
  const [Data, setData] = useState('');
  const [index, setindex] = useState(0);
  const isMounted = useRef();

  async function Get() {
    const docRef = await firestore()
      .collection('Wisata')
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

  const galery = {...Data['Galery']};
  const images = [];
  Object.keys(galery).map(x => {
    images.push({
      id: x,
      uri: galery[x],
    });
  });

  function showFullDesc() {
    Alert.alert('Deskripsi', Data['Deskripsi']);
  }

  return (
    <View style={styles.container}>
      <>
        <ScrollView>
          <Image source={{uri: Data.Gambar}} style={styles.img} />
          <Btnback onPress={() => navigation.goBack()} />
          <View style={styles.inlineWrap}>
            <Text style={styles.title}>{Data.Nama}</Text>
            <Text style={styles.caption}>
              {Data.Kecamatan}, {Data.Kabupaten}
            </Text>
          </View>
          <Cardratingreview onPress={() => alert('hallo')} />
          <Text style={styles.headline0}>Deskripsi</Text>
          <Pressable onPress={showFullDesc}>
            <Text
              style={styles.subtitle}
              numberOfLines={5}
              ellipsizeMode="tail">
              {Data.Deskripsi}
            </Text>
          </Pressable>
          <Text style={styles.headline}>Gallery</Text>
          <FlatList
            horizontal={true}
            data={Data['Galery']}
            renderItem={({item}) => (
              <Thumbgallery
                uri={item}
                onPress={() => {
                  setvisible(true), setindex(index);
                }}
              />
            )}
          />
          <ImageView
            images={images}
            visible={visible}
            imageIndex={index}
            keyExtractor={item => item.id}
            onRequestClose={() => setvisible(false)}
          />
        </ScrollView>
        <View style={styles.wrapBtn}>
          <Btnnearby
            title="Jelajahi sekitar"
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
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
  img: {
    height: 370,
    width: wp(100),
    alignSelf: 'center',
    position: 'absolute',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  inlineWrap: {
    marginTop: hp(42),
    marginLeft: 20,
  },
  title: {color: 'black', fontWeight: 'bold', fontSize: 25},
  caption: {color: 'black', fontWeight: '300'},
  headline0: {
    color: '#808080',
    fontSize: 15,
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: -10,
  },
  headline: {
    color: '#808080',
    fontSize: 15,
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
    borderTopWidth: 1,
    paddingTop: 7,
    borderTopColor: '#C8C8C8',
    width: wp(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
    padding: 5,
    marginTop: 5,
  },
});
