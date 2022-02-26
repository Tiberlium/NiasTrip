import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Carousel from 'react-native-snap-carousel';
import {useTheme} from '@react-navigation/native';
import darkMap from './darkMap.json';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

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
  const [Theme, setTheme] = useState(false);
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

  let mapRef = useRef(null);

  function onCarouselItemChange(index) {
    let location = Near[index].data;
    mapRef.current.animateToRegion(
      {
        latitude: Number(location.Latitude),
        longitude: Number(location.Longitude),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      300,
    );
  }

  function MoveAway(id, category) {
    if (category === 'tempat wisata') {
      navigation.navigate('Detail', {id});
    } else if (category === 'Makanan') {
      navigation.navigate('Fooddetail', {id});
    } else if (category === 'Penginapan') {
      navigation.navigate('Hoteldetail', {id});
    } else {
      navigation.navigate('Eventdetail', {id});
    }
  }

  const theme = useTheme();

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        customMapStyle={theme.dark === Theme ? [] : darkMap}
        region={{
          latitude: Number(latitude),
          longitude: Number(longitude),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.container}>
        {Near.map((doc, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: Number(doc.data.Latitude),
              longitude: Number(doc.data.Longitude),
            }}
            title="halo"
            description="bangke"
            icon={require('../../asset/location.png')}
          />
        ))}
      </MapView>
      <View>
        <Mapheadercard
          onPress={() => navigation.goBack()}
          value={Theme}
          onChange={() => (Theme ? setTheme(false) : setTheme(true))}
        />
        <View style={styles.itemSlider}>
          <Carousel
            data={Near}
            itemWidth={370}
            sliderWidth={Dimensions.get('window').width}
            onSnapToItem={index => onCarouselItemChange(index)}
            renderItem={({item}) => (
              <Mapcard
                img={item.data.Gambar}
                nama={item.data.Nama}
                kota={item.data.Kabupaten}
                onPress={() => MoveAway(item.id, item.data.Kategori)}
              />
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  itemSlider: {
    marginTop: hp(65),
  },
});
