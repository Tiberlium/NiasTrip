import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
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
  Btnlocation,
  Facilitychip,
  Thumbgallery,
  Actionsheet,
  Btnpesanslide,
  ThumbRating,
  Cardratingreview,
} from '../../component';

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

  function showFullDesc() {
    Alert.alert('Deskripsi', Data['Deskripsi']);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{uri: Data['Gambar']}} style={styles.img} />
        <Btnback onPress={() => navigation.goBack()} />
        <View style={styles.headerContainer2}>
          <View style={styles.inlineWrap}>
            <Text style={styles.title}>{Data.Nama}</Text>
            <Text style={styles.caption}>{Data.Kabupaten}</Text>
          </View>
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
          <Text style={styles.pricetext}>Rp {Data['Harga']}/</Text>
          <Text style={styles.pricetext2}>malam</Text>
        </View>
        <ThumbRating
          colorIcon="orange"
          colorText="black"
          marginTop={hp(48.5)}
          marginLeft={20}
          rating={5}
        />
        <Cardratingreview marginTop={37} />
        <Text style={styles.headline1}>Deskripsi</Text>
        <TouchableOpacity onPress={showFullDesc}>
          <Text style={styles.subtitle} numberOfLines={5} ellipsizeMode="tail">
            {Data['Deskripsi']}
          </Text>
        </TouchableOpacity>
        <Text style={styles.headline1}>Fasilitas</Text>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
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
        <Actionsheet refs={Actionref} data={Data} />
      </ScrollView>
      <View style={styles.footerContainer}>
        <Btnbookmark onPress={addBookmark} />
        <Btnpesanslide onPress={() => Actionref.current?.show()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerImage: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
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
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  containerPrice: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 10,
  },
  inlineWrap: {
    marginTop: hp(8),
    marginLeft: 20,
  },
  title: {color: 'black', fontWeight: 'bold', fontSize: 25},
  caption: {color: 'black', fontWeight: '300'},
  pricetext: {fontSize: 15, fontWeight: 'bold', color: 'black'},
  pricetext2: {fontWeight: '300', fontSize: 13, color: 'black', marginTop: 2},
  headline1: {
    color: '#808080',
    fontSize: 15,
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  headline2: {
    color: '#808080',
    fontSize: 15,
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    paddingLeft: 20,
    paddingTop: 10,
    color: 'black',
    fontWeight: '300',
  },
  footerContainer: {
    borderTopWidth: 1,
    paddingVertical: 4,
    borderTopColor: '#C8C8C8',
    width: wp(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
});
