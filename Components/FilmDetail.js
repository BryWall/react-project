import React from 'react'
import {StyleSheet, View, Text, ActivityIndicator, ScrollView, Image, TouchableOpacity, Share, Platform} from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'

class FilmDetail extends React.Component {
    static navigationOptions = ({navigation}) => {
        const { params } = navigation.state
        if( params.film != undefined && Platform.OS === 'ios'){
            return {
                headerRight :   <TouchableOpacity
                                    style = {styles.share_touchable_headerrightbutton}
                                    onPress = {() => params.shareFilm()}>
                                    <Image
                                        style={styles.share_image}
                                        source={require('../Images/ic_share.png')} />
                                </TouchableOpacity>
            }
        }
        
    }
    constructor(props){
        super(props)
        this.state = {
            film : undefined,
            isLoading : true
        }
        this._shareFilm = this._shareFilm.bind(this)
    }

    componentDidMount(){
        const favoriteFilmIndex = this.props.favoritesFilm.findIndex((item) => item.id === this.props.navigation.state.params.idFilm)
        if(favoriteFilmIndex !== -1){
            this.setState({
                film : this.props.favoritesFilm[favoriteFilmIndex]
            }, () => {this._updateNavigationParams()})
            return
        }
        this.setState({isLoading : true})
        getFilmDetailFromApi(this.props.navigation.getParam('idFilm')).then( data => {
            this.setState({
                film : data,
                isLoading : false
            }, () => {this._updateNavigationParams() })
        })
    }

    _shareFilm(){
        const film = this.state.film;
        Share.share({title : film.title, message : film.overview})
    }

    _displayFloatingActionButton(){
        const film = this.state.film;
        if( film != undefined && Platform.OS === 'android'){
            return(
                <TouchableOpacity
                    style = {styles.share_touchable_floatingactionbutton}
                    onPress = {() => this._shareFilm()}>
                    <Image
                        style={styles.share_image}
                        source={require('../Images/ic_share.png')} />
                </TouchableOpacity>
            )
        }
    }

    _updateNavigationParams(){
        this.props.navigation.setParams( {
            shareFilm : this._shareFilm,
            film : this.state.film
        })
    }

    _toggleFavorite(){
        const action = { type : "TOGGLE_FAVORITE", value : this.state.film}
        this.props.dispatch(action);
    }

    _displayLoading(){
        if(this.state.isLoading){
            return(
                <View style={styles.loading_container}>
                    <ActivityIndicator size = 'large' />
                </View>
            )
        }
    }

    _displayFavoriteImage(){
        var sourceImage = require('../Images/ic_favorite_border.png')
        if(this.props.favoritesFilm.findIndex((item => item.id === this.state.film.id)) !== -1){
            var sourceImage = require('../Images/ic_favorite.png')
        }
        return(
            <Image 
                style={styles.favorite_image}
                source = {sourceImage}
            />
        )
    }

    _getNamesFromArray(array){
        return array.map(e => {
            return e.name;
          }).join(" / ")
    }



    _displayFilm(){
        let film = this.state.film;
        if(film != undefined){
            return(
                <ScrollView style = {styles.ScrollView_container}>
                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.backdrop_path)}}
                    />
                    <Text style = {styles.title}>{film.title}</Text>
                    <TouchableOpacity 
                        style= {styles.favorite_container}
                        onPress={() => this._toggleFavorite()}>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>
                    <Text style = {styles.overview}>{film.overview}</Text>
                    <Text style = {styles.default_text}>Sorti le {moment(new Date(film.release_date)).format('DD/MM/YYYY')}</Text>
                    <Text style = {styles.default_text}>Note : {film.vote_average}</Text>
                    <Text style = {styles.default_text}>Nombre de votes : {film.vote_count}</Text>
                    <Text style = {styles.default_text}>Budget : {numeral(film.budget).format('0,0[.]00 $')}</Text>
                    <Text style = {styles.default_text}>Genre(s) : {this._getNamesFromArray(film.genres)}</Text>
                    <Text style = {styles.default_text}>Companie(s) : {this._getNamesFromArray(film.production_companies)}</Text>
                </ScrollView>
            )
        }
    }
    

    render(){
        return(
            <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
                {this._displayFloatingActionButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    main_container : {
        flex : 1
    },
    loading_container : {
        position : 'absolute',
        left : 0,
        right : 0,
        top : 100,
        bottom : 0,
        alignItems : 'center',
        justifyContent : 'center'
    },
    ScrollView_container : {
        flex : 1
    },
    image : {
        height: 169,
        margin: 5
    },
    title : {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    overview : {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    },
    default_text : {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    favorite_container : {
        alignItems : 'center',
    },
    favorite_image : {
        height : 40,
        width : 40,
    },
    share_touchable_floatingactionbutton : {
        position : 'absolute',
        width : 60,
        height : 60,
        right : 30,
        bottom : 30,
        borderRadius : 30,
        backgroundColor : '#e91e63',
        justifyContent : 'center',
        alignItems : 'center'
    },
    share_image : {
        height : 30,
        width : 30
    },
    share_touchable_headerrightbutton : {
        marginRight : 8
    }
})

const mapStateToProps = (state) => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmDetail)