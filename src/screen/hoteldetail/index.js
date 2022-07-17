import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ToastAndroid,
  ScrollView,
  Pressable,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Btnbookmark,
  Facilitychip,
  Thumbgallery,
  Actionsheet,
  Btnpesanslide,
  ThumbRating,
  Cardratingreview,
  Comment,
  Commentheader,
  Alterrating,
  Postrating,
  Couponcard,
  Emptycouponcard,
} from '../../component';

import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionSheet from 'react-native-actions-sheet';
import auth from '@react-native-firebase/auth';
import ReadMore from '@fawazahmed/react-native-read-more';
import MapView, {Marker} from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Collapse,
  CollapseBody,
  CollapseHeader,
} from 'accordion-collapse-react-native';

export default function Hoteldetail({navigation, route}) {
  const [visible, setvisible] = useState(false);
  const [index, setindex] = useState(0);
  const [Data, setData] = useState([]);
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  const [Ulasan, setUlasan] = useState({});
  const [rating, setrating] = useState(0);
  const [review, setreview] = useState('');
  const [comments, setcomments] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const [nameicon, setnameicon] = useState('chevron-forward');
  const isMounted = useRef();
  const Actionref = useRef();
  const isOpen = useRef();
  const id = route.params.id;
  const uid = auth().currentUser.uid;

  async function Get() {
    const docRef = await firestore().collection('Staycation').doc(id).get();

    if (isMounted.current) {
      setData(docRef.data());
      setLatitude(docRef.data().Latitude);
      setLongitude(docRef.data().Longitude);
    }
  }

  function formatRupiah(uang) {
    return new Intl.NumberFormat('ID-id', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(uang);
  }

  async function Getcomment() {
    let x = [];
    const docRef = await firestore()
      .collection('Staycation')
      .doc(id)
      .collection('Comment')
      .limit(2)
      .get();
    docRef.docs.map(doc => {
      if (doc.exists) {
        x.push({
          id: doc.id,
          data: doc.data(),
        });
      } else {
        return {};
      }
    });
    if (isMounted.current) return setcomments(x);
  }

  async function Getyourcomment() {
    const docRef = await firestore()
      .collection('Staycation')
      .doc(id)
      .collection('Comment')
      .doc(uid)
      .get();

    if (docRef.exists && isMounted.current) {
      setUlasan(docRef.data());
      setisEdit(true);
    } else {
      setisEdit(false);
      return [];
    }
  }

  async function getrating() {
    let x = [];

    const docRef = await firestore()
      .collection('Staycation')
      .doc(id)
      .collection('Comment')
      .get();

    const docRat = await firestore().collection('Staycation').doc(id);

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

  async function Postcomment() {
    const docRef = await firestore()
      .collection('Staycation')
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
    getrating();
  }

  async function Hapusreview() {
    const docRef = await firestore()
      .collection('Staycation')
      .doc(id)
      .collection('Comment')
      .doc(uid);

    docRef.delete().then(() => {
      setisEdit(false);
      Getcomment();
    });
  }

  async function Editreview() {
    setisEdit(false);
    setreview(Ulasan.Review);
    setrating(Ulasan.Rating);
  }

  useEffect(() => {
    isMounted.current = true;
    Get();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    Getyourcomment();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    Getcomment();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    getrating();
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

    AsyncStorage.getItem(`Book-${uid}`).then(doc => {
      doc = doc === null ? [] : JSON.parse(doc);
      doc.push(value);
      return AsyncStorage.setItem(`Book-${uid}`, JSON.stringify(doc));
    });
    ToastAndroid.show('Ditambahkan ke Bookmark', ToastAndroid.SHORT);
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={{uri: Data['Gambar']}} style={styles.img} />
        <View style={styles.headerContainer2}>
          <View style={styles.inlineWrap}>
            <Text style={styles.title}>{Data.Nama}</Text>
            <Text style={styles.caption}>{Data.Kabupaten}</Text>
          </View>
        </View>
        <ThumbRating
          colorText="black"
          marginTop={hp(44)}
          marginLeft={20}
          rating={Number(Data['Rating']) || 0}
        />
        <View style={styles.containerPrice}>
          <Text style={styles.pricetext}>{formatRupiah(Data['Harga'])}/</Text>
          <Text style={styles.pricetext2}>malam</Text>
        </View>
        <Cardratingreview
          marginTop={20}
          onPress={() => isOpen.current?.show()}
        />
        <Collapse
          style={styles.collapse}
          onToggle={x =>
            x !== true
              ? setnameicon('chevron-forward')
              : setnameicon('chevron-down')
          }>
          <CollapseHeader style={styles.collapseheader}>
            <Text style={styles.headline}>Kupon promo</Text>
            <Icon
              name={nameicon}
              size={20}
              color="black"
              style={styles.iconcollapse}
            />
          </CollapseHeader>
          <CollapseBody>
            <Emptycouponcard/>
          </CollapseBody>
        </Collapse>
        <Text style={styles.headline1}>Deskripsi</Text>
        <ReadMore style={styles.subtitle} numberOfLines={4}>
          {Data['Deskripsi']}
        </ReadMore>
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
        <View>
          <Text style={styles.headline2}>Lokasi</Text>
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
        <Actionsheet refs={Actionref} data={Data} />
      </ScrollView>
      <View style={styles.footerContainer}>
        <Btnbookmark onPress={addBookmark} />
        <Btnpesanslide onPress={() => Actionref.current?.show()} />
      </View>
      <ActionSheet ref={isOpen} gestureEnabled={true}>
        {!isEdit ? (
          <Postrating
            rating={rating}
            selectrating={setrating}
            review={review}
            selectreview={setreview}
            post={Postcomment}
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
            navigation.navigate('Commentscreen', {
              collection: 'Staycation',
              id,
            });
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
    marginTop: hp(29),
  },
  img: {
    height: 350,
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
    paddingTop: 40,
  },
  inlineWrap: {
    marginTop: hp(6),
    marginLeft: 20,
  },
  title: {color: 'white', fontWeight: 'bold', fontSize: 25},
  caption: {color: 'white', fontWeight: '300'},
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
    paddingHorizontal: 20,
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
  mapContainer: {overflow: 'hidden', borderRadius: 20, alignSelf: 'center'},
  map: {
    height: hp(18),
    width: wp(90),
  },
  headline: {
    color: '#808080',
    fontSize: 15,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  collapse: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingVertical: 20,
    borderWidth: 0.2,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 5,
  },
  collapseheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconcollapse: {marginRight: 20},
});
