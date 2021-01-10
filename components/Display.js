import React from 'react'
import {StyleSheet, Text, View} from 'react-native'

const styles = StyleSheet.create({
    display:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#000'
    },
    displayValue:{
        fontSize: 55,
        color: '#A9A9A9'
    }
})

export default props => {
    return(
        <View style={styles.display}>
            <Text style={styles.displayValue}
            numberOfLines={1}
            >{props.value}</Text>
        </View>
    )
}