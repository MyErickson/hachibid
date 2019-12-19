import React, { Component } from 'react';
import { View,  } from 'react-native';
import { Style } from './styleMessageCategory'
import AsyncStorage from '@react-native-community/async-storage';
import AlertDialog from '../AlertDialog/AlertDialog'
import MyQuestionsContainer from "../../containers/MyQuestions/MyQuestions"



class MessageCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        _messages:undefined,
        title:"",
        _messageFilter:undefined,
        filter:undefined,
        idUser:undefined,
        alertVisible:false,
        alertText :undefined,
        alertConfirm:undefined,
        style:undefined,
        
    };
 
  }
  
    static  getDerivedStateFromProps(props, state){
    const { params } = props.navigation.state
    console.log("TCL: MessageCategory -> getDerivedStateFromProps -> props", props)
     
        props.navigation.closeDrawer()
        state.title = params.nameCategory
        state._messageFilter = props.filterMessagesCategory
        state._messages= props.dataMessagesCategory
        if(props.dataProfileUser){
          state.idUser = props.dataProfileUser.data.id
        }
       
  
    }


  render() {
     const { 
      alertVisible,
      alertText,
      alertConfirm,
      style,
      _messageFilter,
      _messages,
      title

     }=this.state

 

    return (
             
        <View   style={Style.container}>
           <MyQuestionsContainer
             navigation = {this.props.navigation}
             currentScreen ="MessageCategory"
             nameScreenCat = {title }
             dataMessagesCategory={_messages}
             dataFilterMessagesCategory={_messageFilter}
             idCategory={this.props.navigation.state.params.id}
            />
        <AlertDialog 
          alertVisible={alertVisible}
          messageAlert={alertText}
          closeAlert={this.closeAlert}
          alertConfirm={alertConfirm}
          yesConfirm={this.sendPrecision}
          style={style}
                 />

      </View>
    );
  }
}

export default MessageCategory;
