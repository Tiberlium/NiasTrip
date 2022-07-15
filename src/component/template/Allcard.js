import React from 'react';
import {View, Image, TouchableOpacity, StyleSheet, Text} from 'react-native';
import StarRating from 'react-native-star-rating';

export default function Allcard({
  title,
  kota,
  kabupaten,
  gambar,
  onPress,
  rating,
  value,
}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={{uri: gambar}} style={styles.img} />
        <View style={styles.reviewcont2}>
          <StarRating
            rating={rating}
            starSize={14}
            fullStarColor={'orange'}
            containerStyle={styles.ratingcont}
            emptyStarColor={'grey'}
          />
          <Text style={{color: 'white', marginLeft: 5, marginTop: -4}}>
            ({value})
          </Text>
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.caption}>
          {kota}, {kabupaten}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function Allcard2({title, rating, gambar, onPress, value}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Image source={{uri: gambar}} style={styles.img} />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.reviewcont}>
          <StarRating
            rating={rating}
            starSize={15}
            fullStarColor={'orange'}
            containerStyle={styles.ratingcont}
            emptyStarColor={'grey'}
          />
          <Text style={{color: 'grey', marginLeft: 10, marginTop: -2}}>
            ({value})
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export function Allcard3({
  title,
  kota,
  kabupaten,
  gambar,
  onPress,
  rating,
  value,
  price
}) {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.container3}>
        <Image source={{uri: gambar}} style={styles.img} />
        <View style={styles.reviewcont2}>
          <StarRating
            rating={rating}
            starSize={14}
            fullStarColor={'orange'}
            containerStyle={styles.ratingcont}
            emptyStarColor={'grey'}
          />
          <Text style={{color: 'white', marginLeft: 5, marginTop: -4}}>
            ({value})
          </Text>
        </View>
        <Text style={{color: 'black', marginLeft: 10, marginVertical: 10,fontWeight:'600'}}>
          {price}
        </Text>
        <Text style={styles.title3}>{title}</Text>
        <Text style={styles.caption3}>
          {kota}, {kabupaten}
        </Text>
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
  container3: {
    height: 225,
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
    marginTop: 156,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 10,
  },
  title3: {
    position: 'absolute',
    color: 'black',
    marginTop: 165,
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
  caption3: {
    position: 'absolute',
    color: 'black',
    marginTop: 190,
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
  reviewcont2: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 11,
    marginTop: -20,
  },
});
