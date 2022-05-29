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
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/Ionicons';
import Auth from '@react-native-firebase/auth';

export default function Ratingreview({refs, ulasan, posting}) {
  const [rating, setrating] = useState(0);
  const [review, setreview] = useState('');
  let rawdata = ulasan ?? false;

  let data = rawdata.filter(doc => doc.Id === Auth().currentUser.uid);

  function post() {
    posting(rating, review);
    setrating(0);
    setreview('');
  }


  const Postreview = () => (
    <View>
      <Text style={styles.txt}>Berikan Ulasan anda</Text>
      <StarRating
        maxStars={5}
        starSize={30}
        rating={rating}
        selectedStar={setrating}
        containerStyle={styles.ratingContainer}
      />
      <View style={styles.input}>
        <TextInput
          placeholder="Tuliskan Pengalaman anda"
          placeholderTextColor="grey"
          multiline={true}
          value={review}
          onChangeText={setreview}
          style={{color: 'black'}}
        />
      </View>
      <Pressable style={styles.btn} onPress={post}>
        <Text style={styles.btntxt}>Posting</Text>
      </Pressable>
    </View>
  );

  const Alterreview = () => (
    <View>
      <Text style={styles2.title}>Ulasan Anda</Text>
      <View style={styles2.wrap}>
        <Image source={{uri: data[0]['Image']}} style={styles2.img} />
        <View>
          <Text style={styles2.txt}>{data[0]['Name']}</Text>
          <View style={styles2.inlineWrap}>
            <Icon name="star" color="orange" size={20} />
            <Text style={styles2.icontxt}>{data[0]['Rating']}</Text>
          </View>
        </View>
      </View>
      <Text style={styles2.caption}>{data[0]['Review']}</Text>
      <Pressable onPress={edit}>
        <Text style={styles2.txtbutton}>Edit ulasan</Text>
      </Pressable>
    </View>
  );
  return (
    <ActionSheet ref={refs} keyboardDismissMode="on-drag">
      {data === null ? <Postreview /> : <Alterreview />}
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
  ratingContainer: {paddingHorizontal: 70, paddingVertical: 10},
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
