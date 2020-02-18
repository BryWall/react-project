import React from 'react'
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'

class FilmItem extends React.Component{


    _displayFavoriteImage(){
        if(this.props.isFilmFavorite){
            var sourceImage = require('../Images/ic_favorite.png')
            return(
                <Image 
                    style={styles.favorite_image}
                    source = {sourceImage}
                />
            )
        }
        return ;
        
    }

    render(){
        const {film, displayDetailForFilm } = this.props;
        return(
            <TouchableOpacity style = {styles.main_container}  onPress = {() => displayDetailForFilm(film.id)} >
                <Image 
                    style = {styles.image}
                    source = {{uri : getImageFromApi(film.poster_path)}}
                />
                <View style = {styles.content_container}>
                    <View style = {styles.header_container}>
                        {this._displayFavoriteImage()}
                        <Text style = {styles.title_text}>{film.title}</Text>
                        <Text style = {styles.vote_text}>{film.vote_average}</Text>
                    </View>
                    <View style = {styles.description_container}>
                        <Text style = {styles.description_text} numberOfLines = {6}>{film.overview}</Text>
                    </View>
                    <View style = {styles.date_container}>
                        <Text style = {styles.date_text}>Sorti le {film.release_date}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

}

const styles = StyleSheet.create({
    main_container : {
        flexDirection : 'row',
        height : 190
    },
    content_container : {
        flexDirection : 'column',
        flex : 1,
        margin : 5
    },
    header_container : {
        flexDirection : 'row',
        flex : 3
    },
    description_container : {
        flex : 7
    },
    date_container : {
        flex: 1
    },
    title_text : {
        fontWeight : 'bold',
        flex : 1,
        flexWrap : 'wrap',
        fontSize : 20,
        paddingRight :  5
        
        
    },
    vote_text : {
        fontWeight : 'bold',
        fontSize : 26,
        color : '#666666'
    },
    description_text : {
        color : '#666666',
        fontStyle : 'italic'
    },
    date_text : {
        textAlign : 'right',
        fontSize : 14
    },
    image : {
        height : 180,
        width  : 120,
        margin : 5
    },
    favorite_image : {
        height : 25,
        width : 25,
        marginRight : 5,
    }
    
})


export default FilmItem