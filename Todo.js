import React from 'react'
import { View, Text } from 'react-native'

export default function Todo({ title }) {
    return (
        <View>
            <Text>{title}</Text>
        </View>
    )
}
