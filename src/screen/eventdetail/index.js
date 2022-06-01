import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Image,
  Alert,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import ActionSheet from 'react-native-actions-sheet';
import {
  Btnback,
  Btnbookmark2,
  Btntiket,
  Tiketpricelabel,
  ThumbRating,
  Cardratingreview,
  Postrating,
  Alterrating,
} from '../../component';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';

export default function Eventdetail({navigation, route}) {
  const [Data, setData] = useState({});
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  const [Ulasan, setUlasan] = useState({});
  const [rating, setrating] = useState(0);
  const [review, setreview] = useState('');
  const isMounted = useRef();
  const isOpen = useRef();

  async function Get() {
    const docRef = await firestore()
      .collection('Event')
      .doc(route.params.id)
      .get();
    if (isMounted.current) {
      setData(docRef.data());
      setLatitude(docRef.data().Latitude);
      setLongitude(docRef.data().Longitude);
    }
  }

  async function Getyourcomment() {
    const docRef = await firestore()
      .collection('Event')
      .doc(route.params.id)
      .collection('Comment')
      .doc(auth().currentUser.uid)
      .get();

    docRef.exists ? setUlasan(docRef.data()) : {};
  }

  useEffect(() => {
    isMounted.current = true;
    Get();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    Getyourcomment();
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

  async function Postreview() {
    const docRef = await firestore()
      .collection('Event')
      .doc(route.params.id)
      .collection('Comment');

    docRef.doc(auth().currentUser.uid).set({
      Image: auth().currentUser.photoURL,
      Name: auth().currentUser.displayName,
      Review: review,
      Rating: rating,
    });

    ToastAndroid.show('Ulasan anda berhasil di post', ToastAndroid.SHORT);
    Getyourcomment();
  }

  async function Editreview() {
    alert('hallo edit');
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{uri: Data.Gambar}} style={styles.img} />
        <View style={styles.wrapHeader}>
          <Btnback onPress={() => navigation.goBack()} />
          <Btnbookmark2 onPress={addBookmark} />
        </View>
        <View style={styles.inlineWrap}>
          <Text style={styles.title}>{Data.Nama}</Text>
          <Text style={styles.caption}>{Data.Kabupaten}</Text>
        </View>
        <ThumbRating
          marginTop={hp(51)}
          colorIcon="orange"
          colorText="black"
          rating={5}
          marginLeft={20}
        />
        <Cardratingreview
          marginTop={30}
          onPress={() => isOpen.current?.show()}
        />
        <Text style={styles.headline}>Deskripsi</Text>
        <Pressable onPress={showFullDesc}>
          <Text style={styles.subtitle} numberOfLines={3} ellipsizeMode="tail">
            {Data.Deskripsi}
          </Text>
        </Pressable>
        <View>
          <Text style={styles.mapTitle}>Lokasi</Text>
          <Pressable
            style={styles.mapContainer}
            onPress={() =>
              navigation.navigate('Map', {
                id: route.params.id,
                latitude: Data['Latitude'],
                longitude: Data['Longitude'],
              })
            }>
            <MapView
              liteMode
              loadingEnabled
              loadingIndicatorColor="black"
              style={styles.map}
              region={{
                latitude: parseFloat(Latitude),
                longitude: parseFloat(Longitude),
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <Marker
                coordinate={{
                  latitude: parseFloat(Latitude) ? parseFloat(Latitude) : 0,
                  longitude: parseFloat(Longitude) ? parseFloat(Longitude) : 0,
                }}
              />
            </MapView>
          </Pressable>
        </View>
      </ScrollView>
      <>
        <View style={styles.wrapBtn}>
          <Tiketpricelabel harga={Data.Harga} />
          <Btntiket onPress={() => alert('halo bangsat')} />
        </View>
        <ActionSheet ref={isOpen}>
          {Ulasan === null ? (
            <Postrating
              rating={rating}
              selectrating={setrating}
              review={review}
              selectreview={setreview}
              post={Postreview}
            />
          ) : (
            <Alterrating
              img={Ulasan.Image}
              title={Ulasan.Name}
              rating={Ulasan.Rating}
              caption={Ulasan.Rating}
              edit={Editreview}
            />
          )}
        </ActionSheet>
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: hp(35),
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
  },
});
