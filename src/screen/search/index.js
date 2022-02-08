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

  let data = [...DataEvent, ...DataHomestay, ...DataMakanan, ...DataWisata];

  let filtered = data.filter(doc =>
    doc.data.Nama.toLowerCase().match(Query.toLowerCase()),
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
        <Chip title="Lagundri" onPress={data => console.log(data)} />
        <Chip title="Ya'ahowu" onPress={data => console.log(data)} />
        <Chip title="Gado" onPress={data => console.log(data)} />
      </View>
      <FlatList
        data={filtered}
        numColumns={2}
        renderItem={({item}) => (
          <Searchcard img={item.data.Gambar} text={item.data.Nama} />
        )}
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
    margin: 20,
  },
  chipWrap: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 15,
  },
});
