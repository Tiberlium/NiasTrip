import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Text, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import {Bookmarkcard} from '../../component';
import auth from '@react-native-firebase/auth';

const Empty = () => {
  return (
    <View>
      <Image source={require('../../asset/bookmark.png')} style={styles.img} />
      <Text style={styles.txt}>Bookmark Kosong</Text>
    </View>
  );
};

export default function Bookmark({navigation}) {
  const isFocus = useIsFocused();
  const [Data, setData] = useState();
  const user = auth().currentUser;

  async function Get() {
    await AsyncStorage.getItem(`Book-${user.uid}`)
      .then(docs => (docs != null ? setData(JSON.parse(docs)) : null))
      .catch(e => console.log(e));
  }

  async function Delete(id) {
    const arr = Data.filter(e => e.id != id);
    await AsyncStorage.setItem(`Book-${user.uid}`, JSON.stringify(arr))
      .then(() => Get())
      .catch(e => console.log(e));
  }

  function MoveAway(id, category) {
    if (category === 'tempat wisata') {
      navigation.navigate('Detail', {id});
    } else if (category === 'Makanan') {
      navigation.navigate('Fooddetail', {id});
    } else if (category === 'Penginapan') {
      navigation.navigate('Hoteldetail', {id});
    }else if(category === 'Tempat Makan'){
      navigation.navigate('Rm', {id});
    }else {
      navigation.navigate('Eventdetail', {id});
    }
  }

  useEffect(() => {
    Get();
  }, [isFocus]);


  const Exist = () => {
    return (
      <FlatList
        data={Data}
        contentContainerStyle={styles.container}
        renderItem={({item}) => (
          <Bookmarkcard
            title={item.title}
            gambar={item.gambar}
            kategori={item.kategori}
            onDelete={() => Delete(item.id)}
            onPress={() => MoveAway(item.id, item.kategori)}
          />
        )}
      />
    );
  };

  return (
    <View>
      <Text style={styles.title}>Bookmark</Text>
      {Data && Data.length ? <Exist /> : <Empty />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {paddingBottom: 100},
  title: {fontWeight: '500', fontSize: 25, color: 'black', padding: 20},
  img: {
    height: 250,
    width: 250,
    alignSelf: 'center',
    marginTop: 150,
  },
  txt: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
    marginTop: 10,
  },
});
