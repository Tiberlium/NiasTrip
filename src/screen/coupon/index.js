import {View, Text, StyleSheet, FlatList} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {Btnback, Promocard} from '../../component';
import firestore from '@react-native-firebase/firestore';

export default function Coupon({navigation}) {
  const [data, setdata] = useState([]);

  const ismounted = useRef();

  async function get() {
    let x = [];
    const docRef = await firestore().collection('Promo').get();
    docRef.docs.map(doc => {
      x.push({
        id: doc.id,
        data: doc.data(),
      });
    });

    if (ismounted.current) return setdata(x);
  }

  useEffect(() => {
    ismounted.current = true;
    get();
    return () => (ismounted.current = false);
  }, []);

  async function move(nama) {
    let x = [];
    const docRef = await firestore()
      .collection('Staycation')
      .where('Nama', '==', nama)
      .get();

    docRef.docs.map(doc => {
      x.push({id: doc.id});
    });

    navigation.navigate('Hoteldetail', {
      id: x[0]['id'],
    });
  }
  return (
    <View>
      <View style={styles.inlineWrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.txt}>Promo</Text>
      </View>
      <FlatList
        data={data}
        contentContainerStyle={{paddingBottom: 100}}
        renderItem={({item, index}) => (
          <Promocard
            title={item['data']['Nama']}
            discount={item['data']['Potongan']}
            validdate={item['data']['Waktu']}
            onpress={() => move(item['data']['Tempat'])}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
  },
  txt: {fontSize: 25, fontWeight: '500', color: 'black', marginTop: 15},
});
