import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {Btnback, Btnnearby, Btnbookmark, Thumbgallery} from '../../component';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageView from 'react-native-image-viewing';

export default function Rm({navigation, route}) {
  const [Data, setData] = useState({});
  const isMounted = useRef();
  const [index, setindex] = useState(0);
  const [visible, setvisible] = useState(false);

  async function Get() {
    const docRef = await firestore()
      .collection('Rm')
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

  return (
    <View>
      <Image source={{uri: Data.Gambar}} style={styles.img} />
      <Btnback onPress={() => navigation.goBack()} />
      <View style={styles.inlineWrap}>
        <Text style={styles.title}>{Data.Nama}</Text>
        <Icon name="star-half" color="blue" size={20}>
          {' '}
          <Text style={styles.caption}>{Data.Rating}</Text>
        </Icon>
      </View>
      <Text style={styles.headline}>Deskripsi</Text>
      <View style={styles.inlineWrap_1}>
        <Icon name="compass" color="black" size={20} />
        <Text style={styles.caption_1}>{Data.Lokasi}</Text>
      </View>
      <View style={styles.inlineWrap_1}>
        <Icon name="call" color="black" size={20} />
        <Text style={styles.caption_1}>{Data.Kontak || 'Tidak tersedia'}</Text>
      </View>
      <View style={styles.inlineWrap_1}>
        <Icon name="time" color="black" size={20} />
        <Text style={styles.caption_1}>{Data.Operasional}</Text>
      </View>
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
      <View style={styles.wrapBtn}>
        <Btnnearby
          title="Lihat Sekitar"
          onPress={() =>
            navigation.navigate('Map', {
              id: route.params.id,
              latitude: Data['Latitude'],
              longitude: Data['Longitude'],
            })
          }
        />
        <Btnbookmark />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    height: 80,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: hp(25),
    elevation: 5,
  },
  title: {color: 'black', fontWeight: 'bold', fontSize: 25},
  caption: {color: 'black', fontWeight: '300', fontSize: 15},
  caption_1: {
    color: 'black',
    fontWeight: '300',
    fontSize: 15,
    marginLeft: 5,
    width: wp(80),
  },
  headline: {
    color: 'black',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  subtitle: {
    padding: 20,
    color: 'black',
    fontWeight: '300',
  },
  wrapBtn: {
    marginTop: hp(87),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    alignSelf: 'center',
  },
  inlineWrap_1: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10,
  },
  headline: {
    color: 'black',
    fontSize: 20,
    marginLeft: 10,
    fontWeight: 'bold',
    marginTop: 25,
  },
});
