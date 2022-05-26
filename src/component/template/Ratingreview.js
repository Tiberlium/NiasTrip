import {Text, StyleSheet, Pressable, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import ActionSheet from 'react-native-actions-sheet';
import {Rating} from 'react-native-ratings';

export default function Ratingreview({refs}) {
  return (
    <ActionSheet ref={refs}>
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
    </ActionSheet>
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
  input: {
    borderWidth: 0.2,
    borderColor: 'black',
    marginVertical: 20,
    marginHorizontal: 30,
    borderRadius: 5,
    height: 100,
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
