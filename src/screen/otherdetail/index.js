import React, {useState, useRef} from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Btnback, Btnbookmark, Btnnearby, Thumbgallery} from '../../component';

const images = [
  {
    id: 1,
    uri: 'https://placeimg.com/640/480/any',
  },
  {
    id: 2,
    uri: 'https://placeimg.com/640/480/nature',
  },
  {
    id: 3,
    uri: 'https://placeimg.com/640/480/people',
  },
  {
    id: 4,
    uri: 'https://placeimg.com/640/480/tech',
  },
];


export default function Otherdetail({navigation}) {
  const [visible, setvisible] = useState(false);
  const [index, setindex] = useState(0);

  return (
    <View>
      <Btnback onPress={() => navigation.goBack()} />
      <Image
        source={{uri: 'https://placeimg.com/640/480/any'}}
        style={styles.img}
      />
      <View style={styles.inlineWrap}>
        <Text style={styles.title}>Lagundri</Text>
        <Text style={styles.caption}>Teluk Dalam,Nias Selatan</Text>
      </View>
      <Text style={styles.headline}>Deskripsi</Text>
      <Text style={styles.subtitle} numberOfLines={5} ellipsizeMode="tail">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        facilisis ac urna ac porttitor. Morbi semper felis id urna ornare
        facilisis nec ut sem. Morbi id ultrices nisl. Ut dapibus eleifend metus,
        et lobortis urna accumsan quis.
      </Text>
      <Text style={styles.headline}>Gallery</Text>
      <FlatList
        horizontal={true}
        data={images}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <Thumbgallery
            source={{uri: item.uri}}
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
      <View style={styles.wrapBtn}>
        <Btnnearby title="Cari Penyedia" />
        <Btnbookmark />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerImage: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  img: {
    height: 300,
    width: wp(100),
    alignSelf: 'center',
    position: 'absolute',
  },
  inlineWrap: {
    width: 250,
    height: 80,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
    marginTop: hp(25),
    elevation: 5,
  },
  title: {color: 'black', fontWeight: 'bold', fontSize: 25},
  caption: {color: 'black', fontWeight: '300'},
  headline: {
    color: 'black',
    fontSize: 20,
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
    marginTop: hp(87),
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    alignSelf: 'center',
  },
});
