import React, { Component } from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import {  Header, Left, Body, Right, Icon, Title} from 'native-base';
import { Badge } from 'react-native-elements'
import { counterNotif } from '../../store/actionRequetes/actionRequetes'
import { Style } from './styleMenu'


class Menu extends Component {
      state = {
      notifQandP:undefined,
      profileUser:undefined,
      notifAnswers:undefined 
    }
   
  
  static getDerivedStateFromProps(props,state){
    const { notificationQuestion,dataProfileUser,allPrecision,answerUser} = props


    if(notificationQuestion && allPrecision ){
    state.notifQandP = counterNotif(notificationQuestion,allPrecision)

    }
    if(dataProfileUser){
    state.profileUser = dataProfileUser.data
    }
    if(answerUser){
      state.notifAnswers = counterNotif(answerUser)
    }
  }


  render() {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
      </View>
    );
  const { notifQandP ,profileUser,notifAnswers}=this.state


  
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
   
          <Right style={{flex:1}}>
            <TouchableOpacity onPress={()=>this.props.navigation.navigate("Notification")}>
              { notifQandP > 0 
              &&  profileUser&& profileUser.roles[0] === "ROLE_ADMIN" &&
              <Badge  
              status="error"  
              containerStyle={Style.badge} 
              textStyle ={{fontSize:10,padding:5}}
            
              value={notifQandP}/> }
              {notifAnswers >0 &&  profileUser&& profileUser.roles[0] === "ROLE_USER" &&
              <Badge  
              status="error"  
              containerStyle={Style.badge} 
              textStyle ={{fontSize:10,padding:5}}
            
              value={notifAnswers}/>
              }
      
            <Icon style={Style.icon} name='notifications' />
            </TouchableOpacity>
          </Right>
        </Header>
   
    </View>
    
    );
  }
}

export default Menu;
