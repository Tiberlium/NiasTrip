import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {
  Btnback,
  Btnbookmark,
  Btnlocation,
  Facilitychip,
  Placecard,
  Thumbgallery,
  Btnbooking,
  Btndate,
} from '../../component';
import ActionSheet from 'react-native-actions-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import NumericInput from 'react-native-numeric-input';

const images = [
  {
    id: 1,
    uri: 'https://placeimg.com/640/480/any',
  },
  {
    id: 2,
    uri: 'https://placeimg.com/640/480/nature',
  },
  {
    id: 3,
    uri: 'https://placeimg.com/640/480/people',
  },
  {
    id: 4,
    uri: 'https://placeimg.com/640/480/tech',
  },
];

const Facility = ['tv', 'utensils', 'bed', 'wifi', 'bath', 'fan'];

const Action = ({refs}) => {
  const [inshow, setinshow] = useState(false);
  const [outshow, setoutshow] = useState(false);
  const [checkin, setcheckin] = useState(new Date());
  const [checkout, setcheckout] = useState(new Date());

  const [jmlhOrg, setjmlhOrg] = useState(0);

  function onChange(event, value) {
    if (inshow && event.type === 'set') {
      setcheckin(value);
    } else if (outshow && event.type === 'set') {
      setcheckout(value);
    } else {
      setinshow(false);
      setoutshow(false);
    }
  }

  return (
    <ActionSheet
      ref={refs}
      indicatorColor="black"
      bounceOnOpen={true}
      drawUnderStatusBar={true}
      bounciness={4}
      gestureEnabled={true}>
      <View>
        <Text style={actionStyles.title}>Pemesanan</Text>
        <View style={actionStyles.inlineContainer}>
          <View>
            <Text style={actionStyles.txt}>Check In</Text>
            <Btndate
              onPress={() => setinshow(true)}
              value={checkin.toLocaleString('id-ID', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}
            />
          </View>
          <View style={actionStyles.checkIcon}>
            <Icon name="swap-horizontal-outline" size={30} color="black" />
          </View>
          <View>
            <Text style={actionStyles.txt}>Check Out</Text>
            <Btndate
              onPress={() => setoutshow(true)}
              value={checkout.toLocaleString('id-ID', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              })}
            />
          </View>
        </View>
        <Text style={actionStyles.txt3}>Jumlah</Text>
        <View style={actionStyles.inlineContainer2}>
          <NumericInput
            onChange={value => setjmlhOrg(value)}
            value={jmlhOrg}
            totalHeight={40}
            rounded
            maxValue={4}
          />
          <Text style={actionStyles.txt2}>Orang</Text>
        </View>
        <Btnbooking />
      </View>
      <View>
        {(inshow && <DateTimePicker value={checkin} onChange={onChange} />) ||
          (outshow && <DateTimePicker value={checkout} onChange={onChange} />)}
      </View>
    </ActionSheet>
  );
};

export default function Hoteldetail({navigation}) {
  const [visible, setvisible] = useState(false);
  const [index, setindex] = useState(0);
  const Actionref = useRef();

  return (
    <View>
      <Image
        source={{uri: 'https://placeimg.com/640/480/any'}}
        style={styles.img}
      />
      <View style={styles.headerContainer}>
        <Btnback onPress={() => navigation.goBack()} />
        <Btnbookmark color="white" />
      </View>
      <View style={styles.headerContainer2}>
        <Placecard title="Kasima" kota="teluk dalam" kabupaten="nias selatan" />
        <Btnlocation />
      </View>
      <View style={styles.containerPrice}>
        <Text style={styles.pricetext}>Rp.100.000/</Text>
        <Text style={styles.pricetext2}>malam</Text>
      </View>
      <Text style={styles.headline1}>Deskripsi</Text>
      <Text style={styles.subtitle} numberOfLines={5} ellipsizeMode="tail">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        facilisis ac urna ac porttitor. Morbi semper felis id urna ornare
        facilisis nec ut sem. Morbi id ultrices nisl. Ut dapibus eleifend metus,
        et lobortis urna accumsan quis.
      </Text>
      <Text style={styles.headline1}>Fasilitas</Text>
      <FlatList
        horizontal={true}
        data={Facility}
        renderItem={({item}) => <Facilitychip name={item} />}
      />
      <Text style={styles.headline2}>Gallery</Text>
      <FlatList
        horizontal={true}
        data={images}
        renderItem={({item, index}) => (
          <Thumbgallery
            source={{uri: item.uri}}
            onPress={() => {
              setvisible(true), setindex(index);
            }}
          />
        )}
      />
      <ImageView
        images={images}
        visible={visible}
        imageIndex={index}
        onRequestClose={() => setvisible(false)}
      />
      <View style={styles.wrapBtn}>
        <TouchableOpacity onPress={() => Actionref.current?.setModalVisible()}>
          <Icon name="chevron-up-circle" size={30} color="black" />
        </TouchableOpacity>
      </View>

      <Action refs={Actionref} />
    </View>
  );
}

const actionStyles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 25,
    color: 'black',
    textAlign: 'center',
  },
  txt: {fontWeight: 'bold', fontSize: 20, color: 'black', paddingVertical: 20},
  txt2: {
    fontWeight: '300',
    fontSize: 15,
    color: 'black',
    paddingTop: 10,
    marginHorizontal: 10,
  },
  txt3: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    paddingVertical: 20,
    marginLeft: 10,
  },
  checkIcon: {marginTop: hp(9)},
  inlineContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inlineContainer2: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingBottom: 20,
  },
});

const styles = StyleSheet.create({
  containerImage: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    padding: 10,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerContainer2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(18),
  },
  img: {
    height: 250,
    width: wp(100),
    alignSelf: 'center',
    position: 'absolute',
  },
  containerPrice: {
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingTop: 10,
  },
  pricetext: {fontSize: 20, fontWeight: 'bold', color: 'black'},
  pricetext2: {fontWeight: '300', fontSize: 15, color: 'black', marginTop: 5},
  headline1: {
    color: 'black',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
    marginTop: hp(2),
  },
  headline2: {
    color: 'black',
    fontSize: 20,
    marginLeft: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    paddingLeft: 20,
    paddingTop: 10,
    color: 'black',
    fontWeight: '300',
  },
  wrapBtn: {
    marginTop: hp(90),
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 30,
  },
});
