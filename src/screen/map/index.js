import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapView, {Marker} from 'react-native-maps';

export default function Map() {
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={{height: hp(100), width: wp(100)}}>
        <Marker coordinate={{latitude: 37.78825, longitude: -122.4324}} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {...StyleSheet.absoluteFillObject},
});
