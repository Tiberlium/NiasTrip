import React from 'react'
import { View,StyleSheet } from 'react-native'
import Btncategory from '../atom/Btncategory'

export default function ListCategory() {
    return (
        <View style={styles.wrap}> 
            <Btncategory name="food" label="Makanan" color="orange"/>
            <Btncategory name="bed" label="Homestay" color="blue"/>
            <Btncategory name="calendar" label="Event" color="red"/>
            <Btncategory name="bucket-outline" label="Souvenir" color="chocolate"/>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap:{display:'flex',flexDirection:'row',justifyContent:'space-around'}
})