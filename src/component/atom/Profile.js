import React from 'react'
import { View, Text,Image,StyleSheet } from 'react-native'

export default function Profile({source}) {
    return (
        <View>
            <Image source={source} style={styles.img}/>
        </View>
    )
}


const styles = StyleSheet.create({
    img:{height:70,width:70,borderRadius:35},
})