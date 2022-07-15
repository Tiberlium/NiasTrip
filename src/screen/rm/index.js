import {
  View,
  Text,
  StyleSheet,
  ToastAndroid,
  Image,
  FlatList,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import MapView, {Marker} from 'react-native-maps';
import {
  Btnbookmark,
  Thumbgallery,
  Cardratingreview,
  Comment,
  Commentheader,
  Alterrating,
  Postrating,
  ThumbRating,
} from '../../component';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageView from 'react-native-image-viewing';
import auth from '@react-native-firebase/auth';
import ActionSheet from 'react-native-actions-sheet';

export default function Rm({navigation, route}) {
  const [Data, setData] = useState({});
  const [Latitude, setLatitude] = useState(0);
  const [Longitude, setLongitude] = useState(0);
  const isMounted = useRef();
  const [index, setindex] = useState(0);
  const [visible, setvisible] = useState(false);
  const [Ulasan, setUlasan] = useState({});
  const [rating, setrating] = useState(0);
  const [review, setreview] = useState('');
  const [comments, setcomments] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const isOpen = useRef();
  const id = route.params.id;
  const uid = auth().currentUser.uid;

  async function Get() {
    const docRef = await firestore().collection('Rm').doc(id).get();
    if (isMounted.current) {
      setData(docRef.data());
      setLatitude(docRef.data().Latitude);
      setLongitude(docRef.data().Longitude);
    }
  }

  async function Getcomment() {
    let x = [];
    const docRef = await firestore()
      .collection('Rm')
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
      .collection('Rm')
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
      .collection('Rm')
      .doc(id)
      .collection('Comment')
      .get();

    const docRat = await firestore().collection('Rm').doc(id);

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
      .collection('Rm')
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
      .collection('Rm')
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
  }, []);

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
      <ScrollView>
        <Image source={{uri: Data.Gambar}} style={styles.img} />
        <View style={styles.inlineWrap}>
          <Text style={styles.title}>{Data.Nama}</Text>
          <ThumbRating
            colorText="black"
            rating={Number(Data['Rating']) || 0}
            marginTop={60}
          />
        </View>
        <Cardratingreview
          onPress={() => isOpen.current?.show()}
          marginTop={50}
        />
        <Text style={styles.headLine}>Deskripsi</Text>
        <View style={styles.inlineWrap_1}>
          <Icon name="compass" color="black" size={20} />
          <Text style={styles.caption_1}>{Data.Lokasi}</Text>
        </View>
        <View style={styles.inlineWrap_1}>
          <Icon name="call" color="black" size={20} />
          <Text style={styles.caption_1}>
            {Data.Kontak || 'Tidak tersedia'}
          </Text>
        </View>
        <View style={styles.inlineWrap_1}>
          <Icon name="time" color="black" size={20} />
          <Text style={styles.caption_1}>{Data.Operasional}</Text>
        </View>
        <Text style={styles.headLine}>Gallery</Text>
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
          <Text style={styles.headLine}>Lokasi</Text>
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
      <View style={styles.wrapBtn}>
        <Btnbookmark color="black" onPress={addBookmark} />
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
              collection: 'Rm',
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
  container: {flex: 1},
  containerImage: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  img: {
    height: 390,
    width: wp(100),
    alignSelf: 'center',
    position: 'absolute',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  inlineWrap: {
    marginTop: hp(42),
    marginLeft: 20,
  },
  title: {color: 'white', fontWeight: 'bold', fontSize: 25},
  caption: {color: 'white', fontWeight: '300', fontSize: 15},
  caption_1: {
    color: 'black',
    fontWeight: '300',
    fontSize: 15,
    marginLeft: 5,
    width: wp(80),
  },
  headLine: {
    color: '#808080',
    fontSize: 15,
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: -5,
  },
  subtitle: {
    padding: 20,
    color: 'black',
    fontWeight: '300',
  },
  wrapBtn: {
    borderTopWidth: 1,
    paddingVertical: 4,
    borderTopColor: '#C8C8C8',
    width: wp(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  inlineWrap_1: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 20,
    marginTop: 10,
  },
  map: {
    height: hp(18),
    width: wp(90),
  },
  mapContainer: {
    overflow: 'hidden',
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
  },
});
