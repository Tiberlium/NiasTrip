import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {Btnback, Chip, Searchbar, Searchcard} from '../../component';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';

export default function Search({navigation}) {
  const [DataWisata, setDataWisata] = useState([]);
  const [DataHomestay, setDataHomestay] = useState([]);
  const [DataMakanan, setDataMakanan] = useState([]);
  const [DataEvent, setDataEvent] = useState([]);
  const [Query, setQuery] = useState('');

  const [chip1, setchip1] = useState({background: 'white', text: 'black'});
  const [chip2, setchip2] = useState({background: 'white', text: 'black'});
  const [chip3, setchip3] = useState({background: 'white', text: 'black'});

  const isMounted = useRef();

  async function Getwisata() {
    let x = [];
    const docRef = await firestore().collection('Wisata').get();
    docRef.docs.map(doc => {
      x.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    if (isMounted.current) return setDataWisata(x);
  }

  async function Getevent() {
    let x = [];
    const docRef = await firestore().collection('Event').get();
    docRef.docs.map(doc => {
      x.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    if (isMounted.current) return setDataEvent(x);
  }

  async function Getmakanan() {
    let x = [];
    const docRef = await firestore().collection('Makanan').get();
    docRef.docs.map(doc => {
      x.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    if (isMounted.current) return setDataMakanan(x);
  }

  async function Gethomestay() {
    let x = [];
    const docRef = await firestore().collection('Staycation').get();
    docRef.docs.map(doc => {
      x.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    if (isMounted.current) return setDataHomestay(x);
  }

  useEffect(() => {
    isMounted.current = true;
    Getevent();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    Gethomestay();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    Getmakanan();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    Getwisata();
    return () => (isMounted.current = false);
  }, []);

  let data = [...DataMakanan, ...DataHomestay, ...DataWisata, ...DataEvent];

  let filtered = data.filter(doc =>
    doc.data.Nama.toLowerCase().match(Query.toLowerCase()),
  );

  function MoveAway(id, category) {
    if (category === 'tempat wisata') {
      navigation.navigate('Detail', {id});
    } else if (category === 'Makanan') {
      navigation.navigate('Fooddetail', {id});
    } else if (category === 'Penginapan') {
      navigation.navigate('Hoteldetail', {id});
    } else {
      navigation.navigate('Eventdetail', {id});
    }
  }

  const render = ({item}) => (
    <Searchcard
      img={item.data.Gambar}
      text={item.data.Nama}
      onPress={() => MoveAway(item.id, item.data.Kategori)}
    />
  );

  return (
    <View>
      <View style={styles.inlineWrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Pencarian</Text>
      </View>
      <Searchbar onChangeText={setQuery} value={Query} />
      <Text style={styles.subtitle}>Rekomendasi</Text>
      <View style={styles.chipWrap}>
        <Chip
          title="Lagundri"
          text={chip1.text}
          background={chip1.background}
          onPress={data => {
            if (chip1.background === 'black') {
              setQuery('');
              setchip1({background: 'white', text: 'black'});
              setchip2({background: 'white', text: 'black'});
              setchip3({background: 'white', text: 'black'});
            } else {
              setQuery(data);
              setchip1({background: 'black', text: 'white'});
              setchip2({background: 'white', text: 'black'});
              setchip3({background: 'white', text: 'black'});
            }
          }}
        />
        <Chip
          title="Surf"
          text={chip2.text}
          background={chip2.background}
          onPress={data => {
            if (chip2.background === 'black') {
              setQuery('');
              setchip1({background: 'white', text: 'black'});
              setchip2({background: 'white', text: 'black'});
              setchip3({background: 'white', text: 'black'});
            } else {
              setQuery(data);
              setchip2({background: 'black', text: 'white'});
              setchip1({background: 'white', text: 'black'});
              setchip3({background: 'white', text: 'black'});
            }
          }}
        />
        <Chip
          title="nititi"
          text={chip3.text}
          background={chip3.background}
          onPress={data => {
            if (chip3.background === 'black') {
              setQuery('');
              setchip1({background: 'white', text: 'black'});
              setchip2({background: 'white', text: 'black'});
              setchip3({background: 'white', text: 'black'});
            } else {
              setQuery(data);
              setchip3({background: 'black', text: 'white'});
              setchip2({background: 'white', text: 'black'});
              setchip1({background: 'white', text: 'black'});
            }
          }}
        />
      </View>
      <FlatList
        data={filtered}
        numColumns={2}
        keyExtractor={item => item.id}
        renderItem={render}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inlineWrap: {display: 'flex', flexDirection: 'row'},
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginTop: hp(2.5),
    marginLeft: wp(20),
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 15,
    color: 'black',
    marginLeft: '8%',
    marginVertical: '5%',
  },
  chipWrap: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
    alignSelf: 'center',
  },
  contentContainer: {alignSelf: 'center'},
});
