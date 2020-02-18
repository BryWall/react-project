//Components/Search.js
import React from 'react'
import {StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator} from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi';
import { connect } from 'react-redux';



class FilmList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            films : []
        };
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", {idFilm : idFilm})
    }


    render(){
        return (
            <FlatList
                style = {styles.list}
                data = {this.props.films}
                extraData = {this.props.favoritesFilm}
                keyExtractor = {(items) => items.id.toString()}
                renderItem = {({item}) => <FilmItem film = {item} displayDetailForFilm = {this._displayDetailForFilm}
                isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1)} />}
                onEndReachedThreshold = {0.5}
                onEndReached = { () => {
                    if(!this.props.favoriteList && this.props.page < this.props.totalPages){
                        this.props.loadFilms()
                    }
                }}
            />
        )
    }

    
    
}


const styles = StyleSheet.create({
    list : {
        flex : 1
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmList)