import React, { Component } from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import {  Header, Left, Body, Right, Icon, Title} from 'native-base';
import { Badge } from 'react-native-elements'
import { counterNotif } from '../../store/actionRequetes/actionRequetes'
import { Style } from './styleMenu'
import AsyncStorage from '@react-native-community/async-storage';
import AlertDialog from '../AlertDialog/AlertDialog';


class Menu extends Component {
      state = {
      notifQandP:undefined,
      profileUser:undefined,
      notifAnswers:undefined,
      
    }
   
  
  static getDerivedStateFromProps(props,state){
    const { notificationQuestion,dataProfileUser,allPrecision,answerUser,questionNoValid} = props


    if(notificationQuestion && allPrecision ){
    state.notifQandP = counterNotif(notificationQuestion,allPrecision,questionNoValid)

    }
    if(dataProfileUser){
    state.profileUser = dataProfileUser.data
    }
    if(answerUser){
      state.notifAnswers = counterNotif(answerUser)
    }
  }

  openAlert = () =>{ 
    this.setState({
      alertVisible:true,
      messageAlert:"Voulez-vous quitter l'application ? ",
      style:false,
      alertConfirm :true,

    })
  }

  logOut =()=>{
 
    AsyncStorage.removeItem('sessionJWT')
 
    this.props.initializeState()
    this.props.navigation.navigate("Connection")
   }
     
   closeAlert =()=>{
    this.setState({
      alertVisible:false,
    })
}

  render() {
  
  const { notifQandP ,
    profileUser,
    notifAnswers,
     messageAlert,
     alertVisible,
     style,
     alertConfirm }=this.state


  
    return (
     
      <View>
        <Header style={Style.container}>
            <Left style={{flex:1}} >
              <TouchableOpacity 
              onPress={this.props.navigation.toggleDrawer}>
                <Icon style={Style.icon} name='menu' />
              </TouchableOpacity>
            </Left>
        
          <Body style={{flex:1}} >
            <Title  style={{ alignSelf: 'center', color:"white"}}>{this.props.nameMenu}</Title>
          </Body>
   
          <Right style={{flex:1,flexDirection:"row"}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Notification")}>
              { notifQandP > 0 
              &&  profileUser&& profileUser.roles[0] === "ROLE_ADMIN" &&
              <Badge  
              status="error"  
              containerStyle={Style.badge} 
              textStyle ={{fontSize:10}}
            
              value={notifQandP}/> }
              {notifAnswers >0 &&  profileUser&& profileUser.roles[0] === "ROLE_USER" &&
              <Badge  
              status="error"  
              containerStyle={Style.badge} 
              textStyle ={{fontSize:10}}
            
              value={notifAnswers}/>
             
              }
     
              <Icon style={[Style.icon,{ marginRight:18}]} name='notifications' />

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>this.openAlert()}>
                <Icon style={Style.icon} name='exit' />
              </TouchableOpacity>
          </Right>
        </Header>
              
        <AlertDialog 
            alertVisible={alertVisible}
            messageAlert={messageAlert}
            closeAlert={this.closeAlert}
            style={style}
            alertConfirm={alertConfirm }
            yesConfirm={this.logOut}
        />
    </View>
    
    );
  }
}

export default Menu;
