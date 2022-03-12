import React, {useRef, useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text, Image} from 'react-native';
import MapView, {Callout, Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import Carousel, {Pagination} from 'react-native-snap-carousel';
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
  const [activeslide, setactiveslide] = useState(0);
  const isMounted = useRef();
  const [Theme, setTheme] = useState(false);
  const {latitude, longitude, id} = route.params;

  let mapRef = useRef(null);
  let Markers = useRef();
  let carousel = useRef();

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

    Markers[index].showCallout();
  }

  function onMarkerSelect(location, index) {
    mapRef.current.animateToRegion({
      latitude: Number(location.data.Latitude),
      Longitude: Number(location.data.Longitude),
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    carousel.snapToItem(index);
  }

  function MoveAway(id, category) {
    if (category === 'tempat wisata') {
      navigation.navigate('Detail', {id});
    } else if (category === 'Makanan') {
      navigation.navigate('Fooddetail', {id});
    } else if (category === 'Penginapan') {
      navigation.navigate('Hoteldetail', {id});
    } else if (category === 'Tempat Makan') {
      navigation.navigate('Rm', {id});
    } else {
      navigation.navigate('Eventdetail', {id});
    }
  }

  const theme = useTheme();

  const Dot = () => (
    <Pagination
      dotsLength={Near.length}
      activeDotIndex={activeslide}
      dotStyle={paginationstyles.active}
      dotContainerStyle={paginationstyles.container}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
      inactiveDotStyle={paginationstyles.inactive}
    />
  );

  const firstitem = Near.findIndex(doc => doc.id === id);

  console.log(firstitem);

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
            ref={ref => {
              Markers[index] = ref;
            }}
            key={index}
            coordinate={{
              latitude: Number(doc.data.Latitude),
              longitude: Number(doc.data.Longitude),
            }}
            onPress={() => onMarkerSelect(doc, index)}>
            <Image
              source={require('../../asset/location.png')}
              style={styles.img}
            />
            <Callout tooltip>
              <>
                <View style={styles.calloutStyle}>
                  <Text style={styles.name}>{doc.data.Nama}</Text>
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </>
            </Callout>
          </Marker>
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
            ref={c => (carousel = c)}
            data={Near}
            itemWidth={315}
            sliderWidth={Dimensions.get('window').width}
            initialNumToRender={Near.length}
            firstItem={firstitem}
            onSnapToItem={index => {
              onCarouselItemChange(index);
              setactiveslide(index);
            }}
            inactiveSlideOpacity={100}
            renderItem={({item}) => (
              <Mapcard
                img={item.data.Gambar}
                nama={item.data.Nama}
                kota={item.data.Kategori}
                onPress={() => MoveAway(item.id, item.data.Kategori)}
              />
            )}
          />
          <Dot />
        </View>
      </View>
    </View>
  );
}

const paginationstyles = {
  active: {
    width: 20,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#484848',
    marginTop: -35,
    marginHorizontal: 8,
  },
  container: {alignContent: 'flex-start', width: 10},
  inactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#383838',
  },
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  itemSlider: {
    marginTop: hp(72),
  },
  img: {height: 30, width: 30},
  calloutStyle: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
    marginTop: 10,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -33,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: 0.5,
  },
  name: {
    fontSize: 15,
    marginBottom: 5,
    color: 'black',
    textAlign: 'center',
  },
});
