import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {
  Listcategory,
  Profilehead,
  Searchbtn,
  Subhead,
  Subtitle,
  Thumbcard,
} from '../../component';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import firestore from '@react-native-firebase/firestore';

export default function Home() {
  const [Data, setData] = useState([]);

  const isMounted = useRef();

  async function Get() {
    let y = [];

    const docRef = await firestore().collection('Wisata').limit(4).get();

    docRef.docs.map(x =>
      y.push({
        id: x.id,
        data: x.data(),
      }),
    );

    if (isMounted.current) return setData(y);
  }

  useEffect(() => {
    isMounted.current = true;
    Get();
    return () => (isMounted.current = false);
  }, []);


  const user = auth().currentUser;
  const navigation = useNavigation();
  return (
    <View>
      <Profilehead
        name={user.displayName || user.email || user.phoneNumber}
      />
      <Text style={styles.title}>Mau kemana hari ini?</Text>
      <Searchbtn onPress={() => navigation.navigate('Search')} />
      <Subtitle text1="Pengalaman" text2="Lain" />
      <Listcategory />
      <Subhead onPress={() => navigation.navigate('Fullview')} />
      <FlatList
        horizontal={true}
        data={Data}
        renderItem={({item}) => (
          <Thumbcard
            title={item.data.Nama}
            lokasi={item.data.Kecamatan}
            gambar={item.data.Gambar}
            onPress={() => navigation.navigate('Detail', {id: item.id})}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'black',
    marginHorizontal: wp(5),
    marginBottom: hp(2),
    marginTop: hp(2),
  },
});
