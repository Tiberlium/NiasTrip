import {View, Text, TextInput, Pressable, StyleSheet} from 'react-native';
import StarRating from 'react-native-star-rating';
import React from 'react';

export default function Postrating({
  rating,
  selectrating,
  review,
  selectreview,
  post,
}) {
  return (
    <View>
      <Text style={styles.txt}>Berikan Ulasan anda</Text>
      <StarRating
        maxStars={5}
        starSize={25}
        rating={rating}
        selectedStar={selectrating}
        containerStyle={styles.ratingContainer}
      />
      <View style={styles.input}>
        <TextInput
          placeholder="Tuliskan Pengalaman anda"
          placeholderTextColor="grey"
          multiline={true}
          value={review}
          onChangeText={selectreview}
          style={{color: 'black'}}
        />
      </View>
      <Pressable style={styles.btn} onPress={post}>
        <Text style={styles.btntxt}>Posting</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  txt: {
    color: 'black',
    fontSize: 15,
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'center',
  },
  ratingContainer: {paddingHorizontal: 120, paddingVertical: 10},
  input: {
    borderWidth: 0.2,
    borderColor: 'black',
    marginVertical: 20,
    marginHorizontal: 30,
    borderRadius: 5,
    height: 50,
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
