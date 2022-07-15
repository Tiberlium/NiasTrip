import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Image,
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
  Btnbookmark,
  Btntiket,
  Btnpesanslide,
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
import ReadMore from '@fawazahmed/react-native-read-more';
import NumericInput from 'react-native-numeric-input';
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
  const [qty, setqty] = useState(0);
  const isMounted = useRef();
  const isOpen = useRef();
  const isVisible = useRef();
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

  async function getrating() {
    let x = [];

    const docRef = await firestore()
      .collection('Event')
      .doc(id)
      .collection('Comment')
      .get();

    const docRat = await firestore().collection('Event').doc(id);

    docRef.docs.map(doc => {
      doc.exists ? x.push({id: doc.id, data: doc.data()}) : [];
    });

    let _5star = x.filter(x => x.data.Rating === 5).length;
    let _4star = x.filter(x => x.data.Rating === 4).length;
    let _3star = x.filter(x => x.Rating === 3).length;
    let _2star = x.filter(x => x.Rating === 2).length;
    let _1star = x.filter(x => x.Rating === 1).length;

    //jumlahkan bintang secara individual
    let sumofrating = parseInt(_5star + _4star + _3star + _2star + _1star);

    //jumlahkan total semua angka rating
    let overalrating = parseInt(
      5 * _5star + 4 * _4star + 3 * _3star + 2 * _2star + 1 * _1star,
    );

    //jumlahkan rata - rata
    let average = parseInt(overalrating / sumofrating);

    return docRat.update({Rating: average});
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

  async function Postreview() {
    const docRef = await firestore()
      .collection('Event')
      .doc(id)
      .collection('Comment');

    docRef.doc(Uid).set({
      Image: auth().currentUser.photoURL,
      Name: auth().currentUser.displayName,
      Review: review,
      Rating: rating,
    });
    ToastAndroid.show('Ulasan anda berhasil di post', ToastAndroid.SHORT);
    Getyourcomment();
    getrating();
    setisEdit(true);
  }

  async function Editreview() {
    setreview(Ulasan.Review);
    setrating(Ulasan.Rating);
    setisEdit(false);
  }

  async function Hapusreview() {
    const docRef = await firestore()
      .collection('Event')
      .doc(id)
      .collection('Comment')
      .doc(Uid);
    docRef.delete().then(() => {
      setisEdit(false);
      Getcomment();
    });
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

  useEffect(() => {
    isMounted.current = true;
    getrating();
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

  const Pesantiket = () => {
    return (
      <ActionSheet ref={isVisible} gestureEnabled={true}>
        <View style={tiketstyles.container}>
          <Text style={tiketstyles.title}>Pemesanan Tiket</Text>
          <View style={tiketstyles.inlinecontainer}>
            <View>
              <Text style={tiketstyles.txttitle}>Harga Tiket</Text>
              <Text style={tiketstyles.txtprice}>
                Rp 10000
                <Text style={tiketstyles.txtmark}>/pcs</Text>
              </Text>
            </View>
            <View>
              <NumericInput
                value={qty}
                onChange={setqty}
                totalHeight={40}
                rounded
                maxValue={5}
                onLimitReached={() =>
                  ToastAndroid.show('Maksimal 5 tiket', ToastAndroid.SHORT)
                }
                iconStyle={{color: 'black'}}
              />
            </View>
          </View>
          <View style={tiketstyles.totalwrap}>
            <Text style={tiketstyles.txttotal}>Total</Text>
            <Text style={tiketstyles.txttotalvalue}>Rp 500.000</Text>
          </View>
          <View style={tiketstyles.btnpesan}>
            <Btntiket />
          </View>
        </View>
      </ActionSheet>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{uri: Data.Gambar}} style={styles.img} />
        <View style={styles.inlineWrap}>
          <Text style={styles.title}>{Data.Nama}</Text>
          <Text style={styles.caption}>{Data.Kabupaten}</Text>
        </View>
        <ThumbRating
          marginTop={hp(45)}
          colorText="black"
          rating={Number(Data['Rating']) || 0}
          marginLeft={20}
        />
        <Cardratingreview
          marginTop={50}
          onPress={() => isOpen.current?.show()}
        />
        <Text style={styles.headline}>Deskripsi</Text>
        <ReadMore style={styles.subtitle} numberOfLines={3}>
          {Data.Deskripsi}
        </ReadMore>
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
          <Btnbookmark onPress={addBookmark} />
          <Btnpesanslide onPress={() => isVisible.current?.show()} />
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
              hapus={Hapusreview}
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
        <Pesantiket />
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
    padding: 1,
    borderTopColor: '#C8C8C8',
    width: wp(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  mapContainer: {overflow: 'hidden', borderRadius: 20, alignSelf: 'center'},
});

const tiketstyles = StyleSheet.create({
  container: {paddingTop: 5, paddingBottom: 10},
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
    marginBottom: 20,
  },
  inlinecontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  txttitle: {
    color: 'black',
    fontSize: 14,
  },
  txtprice: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  btnpesan: {
    alignSelf: 'center',
  },
  totalwrap: {
    alignSelf: 'center',
    marginTop: 20,
  },
  txttotal: {
    fontWeight: '400',
    fontSize: 12,
    color: 'black',
    textAlign: 'center',
  },
  txttotalvalue: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
  },
  txtmark: {
    fontSize: 12,
    fontWeight: 'normal',
  },
});
