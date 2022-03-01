import {View, Text, Button} from 'react-native';
import React from 'react';

import firestore from '@react-native-firebase/firestore';
import {BaseNavigationContainer} from '@react-navigation/native';

function adding() {
  let docRef = firestore()
    .collection('Users')
    .doc('u10JSRRxgLNnWaCddo2f7lAEVbh1');

    docRef
    .get()
    .then(doc => {
      if (doc.get('order') != null) {
        docRef.update({
          order: firestore.FieldValue.arrayUnion({
            aaaah: 'baurs',
            yes: 'barusan',
          }),
        });
      } else {
        docRef.set(
          {
            order: [
              {
                penyiksaan: 'bajingan',
                pemerkosaan: 'bejat',
              },
            ],
          },
          {merge: true},
        );
      }
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
}

export default function Test() {
  return (
    <View>
      <Button title="Test data" onPress={adding} />
    </View>
  );
}
