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
      Data,
    };

    AsyncStorage.getItem('Book').then(doc => {
      doc = doc === null ? [] : JSON.parse(doc);
      doc.push(value);
      return AsyncStorage.setItem('Book', JSON.stringify(doc));
    });
    ToastAndroid.show('Ditambahkan ke Bookmark', ToastAndroid.SHORT);
  }

  const galery = {...Data['galery ']};
  const images = [];
  Object.keys(galery).map(x => {
    images.push({
      id: x,
      uri: galery[x],
    });
  });

  return (
    <View>
      <Image source={{uri: Data.gambar}} style={styles.img} />
      <Btnback onPress={() => navigation.goBack()} />
      <View style={styles.inlineWrap}>
        <Text style={styles.title}>{Data.nama}</Text>
        <Text style={styles.caption}>
          {Data.kecamatan}, {Data.kabupaten}
        </Text>
      </View>
      <Text style={styles.headline}>Deskripsi</Text>
      <Text style={styles.subtitle} numberOfLines={5} ellipsizeMode="tail">
        {Data.deskripsi}
      </Text>
      <Text style={styles.headline}>Gallery</Text>
      <FlatList
        horizontal={true}
        data={Data['galery ']}
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
        <Btnnearby title="Lihat Sekitar" />
        <Btnbookmark onPress={addBookmark} />
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
    marginTop: hp(87),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    alignSelf: 'center',
  },
});
