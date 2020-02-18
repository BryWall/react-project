import React from 'react'
import {StyleSheet, View, Platform} from 'react-native'
import HelloWorld from './HelloWorld'

class Test extends React.Component {
    render(){
        return (
            <View style={styles.main_container}>
                <HelloWorld/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    }
})

export default Test