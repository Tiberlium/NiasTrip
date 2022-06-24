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
  Comment,
  Commentheader,
  Alterrating,
  Postrating,
} from '../../component';

import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ActionSheet from 'react-native-actions-sheet';
import auth from '@react-native-firebase/auth';

export default function Hoteldetail({navigation, route}) {
  const [visible, setvisible] = useState(false);
  const [index, setindex] = useState(0);
  const [Data, setData] = useState([]);
  const [Ulasan, setUlasan] = useState({});
  const [rating, setrating] = useState(0);
  const [review, setreview] = useState('');
  const [comments, setcomments] = useState([]);
  const [isEdit, setisEdit] = useState(false);
  const isMounted = useRef();
  const Actionref = useRef();
  const isOpen = useRef();
  const id = route.params.id;
  const uid = auth().currentUser.uid;

  async function Get() {
    const docRef = await firestore().collection('Staycation').doc(id).get();

    if (isMounted.current) return setData(docRef.data());
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
          <Text style={styles.pricetext}>{formatRupiah(Data['Harga'])}/</Text>
          <Text style={styles.pricetext2}>malam</Text>
        </View>
        <ThumbRating
          colorIcon="orange"
          colorText="black"
          marginTop={hp(56)}
          marginLeft={20}
          rating={Data['Rating']}
        />
        <Cardratingreview
          marginTop={37}
          onPress={() => isOpen.current?.show()}
        />
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
    paddingTop: 10,
  },
  inlineWrap: {
    marginTop: hp(7),
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
