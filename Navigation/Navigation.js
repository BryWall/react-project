import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import {StyleSheet, Image} from 'react-native'

import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'
import Test from '../Components/Test'


const SearchStackNavigator = createStackNavigator({
    Search: {
      screen: Search,
      navigationOptions: {
        title: 'Rechercher'
      }
    },
    FilmDetail : {
        screen : FilmDetail
    }
})

const FavoritesStackNavigator = createStackNavigator({
  Favorites: { 
    screen: Favorites,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetail : {
      screen : FilmDetail
  }
})

const MoviesTabNavigator = createBottomTabNavigator({
  Test:{
    screen : Test
  },
  Search : {
    screen : SearchStackNavigator,
    navigationOptions : {
      tabBarIcon : () => {
        return <Image 
            style = {styles.icon}
            source = {require('../Images/ic_search.png')}/>
        
      }
    }
  },
  Favorites : {
    screen : FavoritesStackNavigator,
    navigationOptions : {
      tabBarIcon : () => {
        return <Image 
            style = {styles.icon}
            source = {require('../Images/ic_favorite.png')}/>
      }
    }
  }
},
{
  tabBarOptions : {
    activeBackgroundColor : '#DDDDDD',
    inactiveBackgroundColor : '#FFFFFF',
    showLabel : false,
    showIcon : true
  }
})



const styles = StyleSheet.create({
  icon : {
    height : 30,
    width : 30,
  }
});
export default createAppContainer(MoviesTabNavigator)
