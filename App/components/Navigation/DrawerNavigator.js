import React from 'react';
import { Platform , Dimensions } from 'react-native';
import {  createAppContainer } from 'react-navigation';
import {createDrawerNavigator } from 'react-navigation-drawer'
import MyQuestionsContainer from '../../containers/MyQuestions/MyQuestions';
import ProfileContainer  from '../../containers/Profile/Profile';
import MenuDrawer from './MenuDrawer';
import ChatHomeContainer  from '../../containers/ChatHome/ChatHome';
import MessageCategoryContainer  from '../../containers/MessageCategory/MessageCategory';
import Category from '../Category/Category'



const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH*0.83,
    contentComponent:({navigation})=>{
        return(<MenuDrawer navigation={navigation}/>)
    }
}

const DrawerNavigator = createDrawerNavigator(
    {
   
    
    Home:{
        screen: ChatHomeContainer,
        
    },
    MyQuestions:{
        screen: MyQuestionsContainer
    },
    Profile:{
        screen:ProfileContainer 
    },
    MessageCategory:{
        screen:MessageCategoryContainer
    },
    Category:{
        screen:Category
    }
   
},
DrawerConfig 
)


export default createAppContainer(DrawerNavigator);