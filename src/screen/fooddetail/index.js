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
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Btnback,
  Btnbookmark,
  Thumbgallery,
  ThumbRating,
  Cardratingreview,
  Comment,
  Commentheader,
  Postrating,
  Alterrating,
  Emptycomment,
  Listcardresto,
} from '../../component';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import auth from '@react-native-firebase/auth';
import ActionSheet from 'react-native-actions-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import ReadMore from '@fawazahmed/react-native-read-more';

export default function Fooddetail({navigation, route}) {
  const [nameicon, setnameicon] = useState('chevron-forward');
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

  async function getrating() {
    let x = [];

    const docRef = await firestore()
      .collection('Makanan')
      .doc(id)
      .collection('Comment')
      .get();

    const docRat = await firestore().collection('Makanan').doc(id);

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
    getrating();
  }

  async function Editreview() {
    setisEdit(false);
    setreview(Ulasan.Review);
    setrating(Ulasan.Rating);
  }

  async function Hapusreview() {
    const docRef = await firestore()
      .collection('Makanan')
      .doc(id)
      .collection('Comment')
      .doc(uid);
    docRef.delete().then(() => {
      setisEdit(false);
      Getcomment();
    });
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

  async function redirect(name) {
    let x = [];
    const docRef = await firestore()
      .collection('Rm')
      .where('Nama', '==', name)
      .get();
    docRef.docs.map(doc => {
      x.push({id: doc.id});
    });
    navigation.navigate('Rm', {id: x[0]['id']});
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
          rating={Number(Data['Rating']) || 0}
          colorText="black"
          marginLeft={20}
          marginTop={hp(55.5)}
        />
        <Cardratingreview
          marginTop={30}
          onPress={() => isOpen.current?.show()}
        />
        <Text style={styles.headline0}>Deskripsi</Text>

        <ReadMore style={styles.subtitle} numberOfLines={5}>
          {Data['Deskripsi']}
        </ReadMore>

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

        <Collapse
          style={styles.collapse}
          isExpanded={true}
          onToggle={x =>
            x !== true
              ? setnameicon('chevron-forward')
              : setnameicon('chevron-down')
          }>
          <CollapseHeader style={styles.collapseheader}>
            <Text style={styles.headline}>Tersedia di tempat</Text>
            <Icon
              name={nameicon}
              size={20}
              color="black"
              style={styles.iconcollapse}
            />
          </CollapseHeader>
          <CollapseBody>
            {Data['Tersedia']?.map((doc, index) => (
              <Listcardresto
                nama={doc}
                key={index}
                onPress={() => redirect(doc)}
              />
            ))}
          </CollapseBody>
        </Collapse>
      </ScrollView>
      <>
        <View style={styles.wrapBtn}>
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
              hapus={Hapusreview}
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
    alignSelf: 'center',
  },
  collapse: {
    marginTop: 20,
    backgroundColor: 'white',
    elevation: 5,
    paddingVertical: 10,
  },
  collapseheader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconcollapse: {marginTop: '3%', marginRight: 30},
});
