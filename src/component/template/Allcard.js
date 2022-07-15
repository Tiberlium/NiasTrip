import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import StarRating from 'react-native-star-rating';

export default function Allcard({title, kota, kabupaten, gambar, onPress}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={{uri: gambar}} style={styles.img} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.caption}>
          {kota}, {kabupaten}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Allcard2({title, kategori, gambar, onPress}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={{uri: gambar}} style={styles.img} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.reviewcont}>
          <StarRating
            rating={5}
            starSize={15}
            fullStarColor={'orange'}
            containerStyle={styles.ratingcont}
            emptyStarColor={'grey'}
          />
          <Text style={{color: 'grey', marginLeft: 10, marginTop: -2}}>
            (5)
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export {Allcard2};

const styles = StyleSheet.create({
  container: {
    height: 210,
    backgroundColor: 'white',
    width: 350,
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
    elevation: 4,
  },
  img: {
    height: 140,
    width: 350,
    borderRadius: 10,
  },
  descSet: {
    marginTop: -50,
  },
  title: {
    position: 'absolute',
    color: 'black',
    marginTop: 150,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
  caption: {
    position: 'absolute',
    color: 'black',
    marginTop: 178,
    fontWeight: '200',
    fontSize: 15,
    marginLeft: 10,
  },
  ratingcont: {
    width: '20%',
  },
  reviewcont: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 40,
    marginLeft: 11,
  },
});
