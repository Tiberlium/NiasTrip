import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Btnback,
  Btnbookmark,
  Btnlocation,
  Facilitychip,
  Placecard,
  Thumbgallery,
  Actionsheet,
} from '../../component';

import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Hoteldetail({navigation, route}) {
  const [visible, setvisible] = useState(false);
  const [index, setindex] = useState(0);
  const Actionref = useRef();
  const [Data, setData] = useState([]);
  const isMounted = useRef();

  async function Get() {
    const docRef = await firestore()
      .collection('Staycation')
      .doc(route.params.id)
      .get();

    if (isMounted.current) return setData(docRef.data());
  }

  useEffect(() => {
    isMounted.current = true;
    Get();
    return () => (isMounted.current = false);
  }, []);

  const galery = {...Data['Galery']};
  const images = [];
  Object.keys(galery).map(x => {
    images.push({
      id: x,
      uri: galery[x],
    });
  });

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
    <View>
      <Image source={{uri: Data['Gambar']}} style={styles.img} />
      <View style={styles.headerContainer}>
        <Btnback onPress={() => navigation.goBack()} />
        <Btnbookmark color="white" onPress={addBookmark} />
      </View>
      <View style={styles.headerContainer2}>
        <Placecard title={Data['Nama']} kota={Data['Kabupaten']} />
        <Btnlocation
          onPress={() =>
            navigation.navigate('Map', {
              id: route.params.id,
              latitude: Data['Latitude'],
              longitude: Data['Longitude'],
            })
          }
        />
      </View>
      <View style={styles.containerPrice}>
        <Text style={styles.pricetext}>{Data['Harga']}/</Text>
        <Text style={styles.pricetext2}>malam</Text>
      </View>
      <Text style={styles.headline1}>Deskripsi</Text>
      <Text style={styles.subtitle} numberOfLines={5} ellipsizeMode="tail">
        {Data['Deskripsi']}
      </Text>
      <Text style={styles.headline1}>Fasilitas</Text>
      <FlatList
        horizontal={true}
        data={Data['Fasilitas']}
        renderItem={({item}) => <Facilitychip name={item} />}
      />
      <Text style={styles.headline2}>Gallery</Text>
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
        <TouchableOpacity onPress={() => Actionref.current?.setModalVisible()}>
          <Icon name="chevron-up-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <Actionsheet refs={Actionref} data={Data} />
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
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(18),
  },
  img: {
    height: 250,
    width: wp(100),
    alignSelf: 'center',
    position: 'absolute',
  },
  containerPrice: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 10,
  },
  pricetext: {fontSize: 20, fontWeight: 'bold', color: 'black'},
  pricetext2: {fontWeight: '300', fontSize: 15, color: 'black', marginTop: 5},
  headline1: {
    color: 'black',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: hp(2),
  },
  headline2: {
    color: 'black',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    paddingLeft: 20,
    paddingTop: 10,
    color: 'black',
    fontWeight: '300',
  },
  wrapBtn: {
    marginTop: hp(90),
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
  },
});
