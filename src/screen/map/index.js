import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

import {Mapheadercard, Mapcard} from '../../component';


function nearby(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == 'K') {
    dist = dist * 1.609344;
  }
  if (unit == 'N') {
    dist = dist * 0.8684;
  }
  return dist;
}

export default function Map({navigation, route}) {
  const [Wisata, setWisata] = useState([]);
  const [Homestay, setHomestay] = useState([]);
  const [Event, setEvent] = useState([]);
  const [Resto, setResto] = useState([]);

  const isMounted = useRef();

  const {id, latitude, longitude} = route.params;

  async function getWisata() {
    let x = [];
    const docRef = await firestore().collection('Wisata').get();
    docRef.docs.map(doc => {
      x.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    if (isMounted.current) return setWisata(x);
  }

  async function getHomestay() {
    let x = [];
    const docRef = await firestore().collection('Staycation').get();
    docRef.docs.map(doc => {
      x.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    if (isMounted.current) return setHomestay(x);
  }

  async function getEvent() {
    let x = [];
    const docRef = await firestore().collection('Event').get();
    docRef.docs.map(doc => {
      x.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    if (isMounted.current) return setEvent(x);
  }

  async function getResto() {
    let x = [];
    const docRef = await firestore().collection('Rm').get();
    docRef.docs.map(doc => {
      x.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    if (isMounted.current) return setResto(x);
  }

  useEffect(() => {
    isMounted.current = true;
    getWisata();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    getResto();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    getEvent();
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    getEvent();
    return () => (isMounted.current = false);
  }, []);

  let Data = [...Homestay, ...Event, ...Resto, ...Wisata];

  const lat = Number(latitude);
  const long = Number(longitude);

  let Near = [];

  Data.map(doc => {
    if (
      nearby(
        lat,
        long,
        Number(doc.data.Latitude),
        Number(doc.data.Longitude),
        'K',
      ) <= 5
    ) {
      Near.push({
        id: doc.id,
        data: doc.data,
      });
    }
  });


  
  return (
    <>
      <View style={styles.container}>
        <MapView
          region={{
            latitude: Number(latitude),
            longitude: Number(longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{height: hp(100), width: wp(100)}}>
          {Near.map((doc, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: Number(doc.data.Latitude),
                longitude: Number(doc.data.Longitude),
              }}
            />
          ))}
        </MapView>
      </View>
      <View>
        <Mapheadercard onPress={() => navigation.goBack()} />
        <Animated.FlatList
          data={Near}
          horizontal={true}
          renderItem={({item}) => (
            <Mapcard
              img={item.data.Gambar}
              nama={item.data.Nama}
              kota={item.data.Kabupaten}
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {...StyleSheet.absoluteFillObject, position: 'absolute'},
});
