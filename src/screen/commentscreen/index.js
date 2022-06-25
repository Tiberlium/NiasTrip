import {View, Text, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {Btnback, Comment} from '../../component';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';

export default function Commentscreen({navigation, route}) {
  const {collection, id} = route.params;
  const [data, setdata] = React.useState([]);
  const isMounted = React.useRef();

  async function get() {
    let x = [];
    const docRef = await firestore()
      .collection(collection)
      .doc(id)
      .collection('Comment')
      .get();
    docRef.docs.map(doc => {
      doc.exists ? x.push({id: doc.id, data: doc.data()}) : {};
    });
    if (isMounted.current) return setdata(x);
  }

  React.useEffect(() => {
    isMounted.current = true;
    get();
    return () => (isMounted.current = false);
  }, []);

  return (
    <View>
      <View style={styles.wrap}>
        <Btnback onPress={() => navigation.goBack()} />
        <Text style={styles.headline}>Semua Komentar</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Comment
            photoURI={item.data.Image}
            name={item.data.Name}
            rating={item.data.Rating}
            comment={item.data.Review}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {display: 'flex', flexDirection: 'row', marginBottom: hp(3)},
  headline: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'black',
    marginTop: hp(2.5),
    marginHorizontal: wp(20),
  },
});
