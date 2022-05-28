import {
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import ActionSheet from 'react-native-actions-sheet';
import {Rating} from 'react-native-ratings';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Ratingreview({refs}) {
  const Postreview = () => (
    <View>
      <Text style={styles.txt}>Berikan Ulasan anda</Text>
      <Rating showRating imageSize={30} />
      <View style={styles.input}>
        <TextInput
          placeholder="Tuliskan Pengalaman anda"
          placeholderTextColor="grey"
          multiline={true}
        />
      </View>
      <Pressable style={styles.btn}>
        <Text style={styles.btntxt}>Posting</Text>
      </Pressable>
    </View>
  );

  const Alterreview = () => (
    <View>
      <Text style={styles2.title}>Ulasan Anda</Text>
      <View style={styles2.wrap}>
        <Image
          source={{uri: 'https://placeimg.com/640/480/any'}}
          style={styles2.img}
        />
        <View>
          <Text style={styles2.txt}>Razor</Text>
          <View style={styles2.inlineWrap}>
            <Icon name="star" color="orange" size={20} />
            <Text style={styles2.icontxt}>5</Text>
          </View>
        </View>
      </View>
      <Text style={styles2.caption}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book.
      </Text>
      <Pressable>
        <Text style={styles2.txtbutton}>Edit ulasan</Text>
      </Pressable>
    </View>
  );
  return (
    <ActionSheet ref={refs}>
      <Alterreview />
    </ActionSheet>
  );
}

const styles2 = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    textAlign: 'center',
    color: 'black',
  },
  wrap: {display: 'flex', flexDirection: 'row'},
  img: {
    height: 60,
    width: 60,
    marginLeft: 15,
    borderRadius: 40,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  txt: {fontWeight: 'bold', color: 'black', fontSize: 18, marginTop: 15},
  icontxt: {color: 'black', fontWeight: 'bold', marginLeft: 5},
  inlineWrap: {display: 'flex', flexDirection: 'row', marginTop: 5},
  caption: {
    fontWeight: '300',
    color: 'black',
    width: 400,
    marginHorizontal: 20,
  },
  txtbutton: {
    marginLeft: 20,
    color: '#5E8AC6',
    marginTop: 10,
    marginBottom: 10,
    textDecorationLine: 'underline',
  },
});

const styles = StyleSheet.create({
  txt: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 0.2,
    borderColor: 'black',
    marginVertical: 20,
    marginHorizontal: 30,
    borderRadius: 5,
    height: 100,
    paddingLeft: 10,
  },
  btn: {
    height: 40,
    width: 150,
    backgroundColor: '#339FFF',
    alignSelf: 'center',
    borderRadius: 10,
    margin: 10,
  },
  btntxt: {
    color: 'white',
    textAlign: 'center',
    marginTop: 8,
  },
});
