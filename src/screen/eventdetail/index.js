import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Image,
  Alert,
  Pressable,
  ScrollView,
  FlatList,
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
  Comment,
  Commentheader,
} from '../../component';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';
import {uid} from 'uid';

export default function Eventdetail({navigation, route}) {
  const [Data, setData] = useState({});
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  const [Profile, setProfile] = useState({});
  const [Ulasan, setUlasan] = useState({});
  const [rating, setrating] = useState(0);
  const [review, setreview] = useState('');
  const [isEdit, setisEdit] = useState(false);
  const [comments, setcomments] = useState([]);
  const isMounted = useRef();
  const isOpen = useRef();
  const id = route.params.id;
  const Uid = auth().currentUser.uid;
  const orderid = 'orderId' + uid() + Date.now();

  async function Get() {
    const docRef = await firestore().collection('Event').doc(id).get();
    if (isMounted.current) {
      setData(docRef.data());
      setLatitude(docRef.data().Latitude);
      setLongitude(docRef.data().Longitude);
    }
  }
  async function Getuser() {
    const docRef = await firestore().collection('Users').doc(Uid).get();
    if (docRef.exists && isMounted.current) {
      setProfile(docRef.data());
    } else {
      setProfile({});
    }
  }

  function formatRupiah(uang) {
    return new Intl.NumberFormat('ID-id', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(uang);
  }

  async function Getyourcomment() {
    const docRef = await firestore()
      .collection('Event')
      .doc(id)
      .collection('Comment')
      .doc(Uid)
      .get();

    if (docRef.exists) {
      setUlasan(docRef.data());
      setisEdit(true);
    } else {
      setisEdit(false);
      return {};
    }
  }

  async function Getcomment() {
    let x = [];
    const docRef = await firestore()
      .collection('Event')
      .doc(id)
      .collection('Comment')
      .limit(2)
      .get();

    docRef.docs.map(doc => {
      doc.exists ? x.push({id: doc.id, data: doc.data()}) : {};
    });

    if (isMounted.current) {
      setcomments(x);
    }
  }

  useEffect(() => {
    isMounted.current = true;
    Get();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    Getyourcomment();
  }, []);

  useEffect(() => {
    isMounted.current = true;
    Getcomment();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    Getuser();
    return () => (isMounted.current = false);
  }, []);

  function addBookmark() {
    const value = {
      id: route.params.id,
      title: Data['Nama'],
      gambar: Data['Gambar'],
      kategori: Data['Kategori'],
      orderid,
    };

    AsyncStorage.getItem(`Book-${Uid}`).then(doc => {
      doc = doc === null ? [] : JSON.parse(doc);
      doc.push(value);
      return AsyncStorage.setItem(`Book-${Uid}`, JSON.stringify(doc));
    });
    ToastAndroid.show('Ditambahkan ke Bookmark', ToastAndroid.SHORT);
  }

  function showFullDesc() {
    Alert.alert('Deskripsi', Data['Deskripsi']);
  }

  async function Postreview() {
    const docRef = await firestore()
      .collection('Event')
      .doc(id)
      .collection('Comment');

    docRef.doc(uid).set({
      Image: auth().currentUser.photoURL,
      Name: auth().currentUser.displayName,
      Review: review,
      Rating: rating,
    });

    ToastAndroid.show('Ulasan anda berhasil di post', ToastAndroid.SHORT);
    Getyourcomment();
    setisEdit(true);
  }

  async function Editreview() {
    setisEdit(false);
    setreview(Ulasan.Review);
    setrating(Ulasan.Rating);
  }

  async function pay() {
    if (Object.keys(Profile).length == 0) {
      ToastAndroid.show(
        'Lengkapi data diri anda terlebih dahulu sebelum melakukan pemesanan',
        ToastAndroid.SHORT,
      );
      return false;
    } else {
      navigation.navigate('Paymentevent', {
        Profile,
        tarif: Data['Harga'],
        jenis: 'Event',
        nama: Data['Nama'],
        gambar: Data['Gambar'],
        orderid,
      });
    }
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
          <Tiketpricelabel harga={formatRupiah(Data['Harga'])} />
          <Btntiket onPress={pay} />
        </View>
        <ActionSheet ref={isOpen} gestureEnabled={true}>
          {!isEdit ? (
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
              caption={Ulasan.Review}
              edit={Editreview}
            />
          )}
          <Commentheader
            onPress={() => {
              isOpen.current?.hide();
              navigation.navigate('Commentscreen', {collection: 'Event', id});
            }}
          />
          <View>
            <FlatList
              data={comments}
              renderItem={({item}) => (
                <Comment
                  photoURI={item.data.Image}
                  name={item.data.Name}
                  comment={item.data.Review}
                  rating={item.data.Rating}
                />
              )}
            />
          </View>
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
