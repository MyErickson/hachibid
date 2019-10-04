import React from 'react';
import { Platform , Dimensions } from 'react-native';
import {  createAppContainer } from 'react-navigation';
import {createDrawerNavigator } from 'react-navigation-drawer'
import MyQuestions from '../MyQuestions/MyQuestions';
import Profile from '../Profile/Profile';
import Connection from '../Connection/Connection';
import MenuDrawer from './MenuDrawer';
import ChatHome from '../ChatHome/ChatHome';

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH*0.83,
    contentComponent:({navigation})=>{
        return(<MenuDrawer navigation={navigation}/>)
    }
}

const DrawerNavigator = createDrawerNavigator(
    {
    Connection:{
        screen:Connection
      }, 
    MyQuestions:{
        screen: MyQuestions
    },
    Home:{
        screen: ChatHome
    },
    Profile:{
        screen:Profile
    },
   
},
DrawerConfig 
)


export default createAppContainer(DrawerNavigator);