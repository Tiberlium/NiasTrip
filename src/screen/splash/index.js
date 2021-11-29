import React from 'react'
import { View,Image,StyleSheet } from 'react-native'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';



export default function Splash() {
    return (
        <View>
            <Image source={require('../../asset/Logo.png')} style={styles.img}/>
        </View>
    )
}


const styles = StyleSheet.create({
    img:{height:200,width:200,alignSelf:'center',marginVertical:hp(30)}
})