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
  Thumbgallery,
  Cardratingreview,
  ThumbRating,
  Postrating,
  Alterrating,
  Comment,
  Commentheader,
} from '../../component';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Actionsheet from 'react-native-actions-sheet';
import auth from '@react-native-firebase/auth';
import ReadMore from '@fawazahmed/react-native-read-more';
import MapView, {Marker} from 'react-native-maps';

export default function Detail({route, navigation}) {
  const [visible, setvisible] = useState(false);
  const [Data, setData] = useState('');
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  const [index, setindex] = useState(0);
  const [Ulasan, setUlasan] = useState({});
  const [rating, setrating] = useState(0);
  const [review, setreview] = useState('');
  const [comments, setcomments] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const isMounted = useRef();
  const isOpen = useRef();
  const id = route.params.id;
  const uid = auth().currentUser.uid;

  async function Get() {
    const docRef = await firestore().collection('Wisata').doc(id).get();
    if (isMounted.current) {
      setData(docRef.data());
      setLatitude(docRef.data().Latitude);
      setLongitude(docRef.data().Longitude);
    }
  }

  async function Getcomment() {
    let x = [];
    const docRef = await firestore()
      .collection('Wisata')
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
        return [];
      }
    });
    if (isMounted.current) return setcomments(x);
  }

  async function Getyourcomment() {
    const docRef = await firestore()
      .collection('Wisata')
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
      .collection('Wisata')
      .doc(id)
      .collection('Comment')
      .get();

    const docRat = await firestore().collection('Wisata').doc(id);

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
      .collection('Wisata')
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

  async function Editreview() {
    setisEdit(false);
    setreview(Ulasan.Review);
    setrating(Ulasan.Rating);
  }

  async function Hapusreview() {
    const docRef = await firestore()
      .collection('Wisata')
      .doc(id)
      .collection('Comment')
      .doc(uid);
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
    isMounted.current = true;
    Getcomment();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    Getyourcomment();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    getrating();
    return () => (isMounted.current = false);
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

  const galery = {...Data['Galery']};
  const images = [];
  Object.keys(galery).map(x => {
    images.push({
      id: x,
      uri: galery[x],
    });
  });

  return (
    <View style={styles.container}>
      <>
        <ScrollView>
          <Image source={{uri: Data.Gambar}} style={styles.img} />
          <View style={styles.inlineWrap}>
            <Text style={styles.title}>{Data.Nama}</Text>
            <Text style={styles.caption}>
              {Data.Kecamatan}, {Data.Kabupaten}
            </Text>
          </View>
          <ThumbRating
            colorText="black"
            marginTop={hp(47)}
            marginLeft={20}
            rating={Number(Data['Rating']) || 0}
          />
          <Cardratingreview
            onPress={() => isOpen.current?.show()}
            marginTop={50}
          />
          <Text style={styles.headline0}>Deskripsi</Text>

          <ReadMore style={styles.subtitle} numberOfLines={5}>
            {Data.Deskripsi}
          </ReadMore>

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
          <View>
            <Text style={styles.headline}>Lokasi</Text>
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
                    longitude: parseFloat(Longitude)
                      ? parseFloat(Longitude)
                      : 0,
                  }}
                />
              </MapView>
            </Pressable>
          </View>
        </ScrollView>
        <View style={styles.wrapBtn}>
          <Btnbookmark onPress={addBookmark} color="black" />
        </View>
        <Actionsheet ref={isOpen} gestureEnabled={true}>
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
              navigation.navigate('Commentscreen', {collection: 'Wisata', id});
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
        </Actionsheet>
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
    marginTop: hp(37),
    marginLeft: 20,
    marginBottom: 5,
  },
  title: {color: 'white', fontWeight: 'bold', fontSize: 25},
  caption: {color: 'white', fontWeight: '300'},
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
  },
  mapContainer: {overflow: 'hidden', borderRadius: 20, alignSelf: 'center'},
  map: {
    height: hp(18),
    width: wp(90),
  },
});
