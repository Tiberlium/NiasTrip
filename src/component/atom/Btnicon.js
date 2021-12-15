import React from 'react'
import { View, Text,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Btnicon() {
    return (
        <View>
            <TouchableOpacity>
                <Icon name="arrow-forward" size={30}/>
            </TouchableOpacity>
        </View>
    )
}
