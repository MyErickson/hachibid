import React from 'react';
import { Platform , Dimensions } from 'react-native';
import {  createAppContainer } from 'react-navigation';
import {createDrawerNavigator } from 'react-navigation-drawer'
import MyQuestionsContainer from '../../containers/MyQuestions/MyQuestions';
import ProfileContainer  from '../../containers/Profile/Profile';
import MenuDrawerContainer from '../../containers/MenuDrawer/MenuDrawer';
import ChatHomeContainer  from '../../containers/ChatHome/ChatHome';
import MessageCategoryContainer  from '../../containers/MessageCategory/MessageCategory';
import CategoryContainer from '../../containers/Category/Category'
import NotificationContainer from '../../containers/Notification/Notification';


const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: WIDTH*0.83,
    contentComponent:({navigation})=>{
        return(<MenuDrawerContainer navigation={navigation}/>)
    }
}

const DrawerNavigator = createDrawerNavigator(
    {
   
    Category:{
        screen:CategoryContainer
    },
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
   
    Notification:{
        screen:NotificationContainer,
    }
},
DrawerConfig 
)


export default DrawerNavigator;