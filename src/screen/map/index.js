import React, {useRef, useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';

import {Mapheadercard, Mapcard} from '../../component';

import Icon from 'react-native-vector-icons/Feather';

export default function Map({navigation, route}) {
  const [Wisata, setWisata] = useState([]);
  const [Homestay, setHomestay] = useState([]);
  const [Event, setEvent] = useState([]);
  const [Resto, setResto] = useState([]);

  const isMounted = useRef();

  const {id, latitude, longitude} = route.params;

  const Pinloc = () => <Icon name="Map-pin" size={20} color="blue" />;

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
  return (
    <>
      <View style={styles.container}>
        <Mapheadercard onPress={() => navigation.goBack()} />
        <MapView
          initialRegion={{
            latitude: Number(latitude),
            longitude: Number(longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{height: hp(100), width: wp(100)}}>
          {Data.map((doc, index) => (
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
    </>
  );
}

const styles = StyleSheet.create({
  container: {...StyleSheet.absoluteFillObject, position: 'absolute'},
});
