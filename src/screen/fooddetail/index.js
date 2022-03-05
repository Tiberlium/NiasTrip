import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ToastAndroid,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Btnback, Btnbookmark, Btnnearby, Thumbgallery} from '../../component';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Fooddetail({navigation, route}) {
  const [visible, setvisible] = useState(false);
  const [index, setindex] = useState(0);
  const [Data, setData] = useState({});
  const isMounted = useRef();

  async function Get() {
    const docRefFood = await firestore()
      .collection('Makanan')
      .doc(route.params.id)
      .get();
    if (isMounted.current) return setData(docRefFood.data());
  }

  const galery = {...Data['Galery']};
  let images = [];
  Object.keys(galery).map(doc => {
    images.push({
      uri: galery[doc],
    });
  });

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
      <Image source={{uri: Data['Gambar']}} style={styles.img} />
      <Btnback onPress={() => navigation.goBack()} />
      <View style={styles.inlineWrap}>
        <Text style={styles.title}>{Data['Nama']}</Text>
        <Text style={styles.caption}>{Data['Kategori']}</Text>
      </View>
      <Text style={styles.headline}>Deskripsi</Text>
      <Text style={styles.subtitle} numberOfLines={5} ellipsizeMode="tail">
        {Data['Deskripsi']}
      </Text>
      <Text style={styles.headline}>Galery</Text>
      <FlatList
        horizontal={true}
        data={Data['Galery']}
        renderItem={({item, index}) => (
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
        onRequestClose={() => setvisible(false)}
      />
      <View style={styles.wrapBtn}>
        <Btnnearby
          title="Lokasi Penyedia"
          onPress={() =>
            navigation.navigate('Map', {
              latitude: Data['lat'],
              longitude: Data['long'],
            })
          }
        />
        <Btnbookmark onPress={addBookmark} color="black"/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
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
    marginTop: hp(97),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    alignSelf: 'center',
  },
});
