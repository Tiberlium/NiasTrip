import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ToastAndroid,
  Alert,
  Pressable,
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
  Btnnearby,
  Thumbgallery,
  ThumbRating,
  Cardratingreview,
  Comment,
  Commentheader,
  Postrating,
  Alterrating,
  Emptycomment,
} from '../../component';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import ActionSheet from 'react-native-actions-sheet';

export default function Fooddetail({navigation, route}) {
  const [visible, setvisible] = useState(false);
  const [index, setindex] = useState(0);
  const [Data, setData] = useState({});
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
    const docRefFood = await firestore().collection('Makanan').doc(id).get();
    if (isMounted.current) return setData(docRefFood.data());
  }

  async function Getcomment() {
    let x = [];
    const docRef = await firestore()
      .collection('Makanan')
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
      .collection('Makanan')
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
      .collection('Makanan')
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

  const galery = {...Data['Galery']};
  let images = [];
  Object.keys(galery).map(doc => {
    images.push({
      uri: galery[doc],
    });
  });

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
        <View style={styles.inlineWrap}>
          <Text style={styles.title}>{Data['Nama']}</Text>
          <Text style={styles.caption}>{Data['Kategori']}</Text>
        </View>
        <ThumbRating
          rating="5"
          colorText="black"
          colorIcon="orange"
          marginLeft={20}
          marginTop={hp(54.5)}
        />
        <Cardratingreview
          marginTop={30}
          onPress={() => isOpen.current?.show()}
        />
        <Text style={styles.headline0}>Deskripsi</Text>
        <Pressable onPress={showFullDesc}>
          <Text style={styles.subtitle} numberOfLines={5} ellipsizeMode="tail">
            {Data['Deskripsi']}
          </Text>
        </Pressable>
        <Text style={styles.headline}>Galery</Text>
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
      </ScrollView>
      <>
        <View style={styles.wrapBtn}>
          <Btnnearby
            title="Lokasi Penyedia"
            onPress={() =>
              navigation.navigate('Map', {
                id: route.params.id,
                latitude: Data['lat'],
                longitude: Data['long'],
              })
            }
          />
          <Btnbookmark onPress={addBookmark} color="black" />
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
                collection: 'Makanan',
                id,
              });
            }}
          />
          <View>
            {comments === [] ? (
              <Emptycomment />
            ) : (
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
            )}
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
    height: 370,
    width: wp(100),
    alignSelf: 'center',
    position: 'absolute',
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  inlineWrap: {
    marginTop: hp(39),
    marginLeft: 20,
  },
  title: {color: 'black', fontWeight: 'bold', fontSize: 25},
  caption: {color: 'black', fontWeight: '300'},
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
    paddingVertical: 7,
    borderTopColor: '#C8C8C8',
    width: wp(100),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
});
