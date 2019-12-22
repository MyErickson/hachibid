import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { View, Text,TouchableOpacity} from 'react-native';
import { Button  } from 'react-native-elements'
import { Style} from './styleChatHome';
import {Bubble } from 'react-native-gifted-chat';
import axios from 'axios';
import AlertDialog  from '../AlertDialog/AlertDialog'
var jwtDecode = require('jwt-decode');
import NetInfo from "@react-native-community/netinfo";
import MyQuestionsContainer from "../../containers/MyQuestions/MyQuestions"



var timerMessage;




class ChatHome extends Component {
 
    state = {
      _messages:undefined,
      _messageFilter:undefined,
      filter:undefined,
      deleteTextSearchBar:undefined,
      _textFilter:undefined,
      idUser:undefined,
      alertVisible:false,
      alertText :undefined,
      alertConfirm:undefined,
      style:undefined,
      currentMessageForPrecision:undefined
    }
  
    async componentDidMount() {
      let data = new Object 
      const sessionId = await AsyncStorage.getItem('sessionJWT')
      var isInternetReachable 
      var isConnected  

      const { receiveResponseConnection , dataMessagesHome , dataProfileUsers ,answerUser} = this.props
     
      console.log("ASYNCSTORAGE avant le decode ===>",receiveResponseConnection)
  
        var decode = jwtDecode(receiveResponseConnection)
        console.log(decode)
        data.id = decode.id 
        data.token = receiveResponseConnection
        dataProfileUsers( data )
        answerUser(data)
        dataMessagesHome(receiveResponseConnection)
    
      
        await NetInfo.fetch().then(state => {
          isInternetReachable = state.isInternetReachable
          isConnected  = state.isConnected 
     
        });
        
        timerMessage = setInterval(()=>{
      
          if(isConnected && isInternetReachable){
            dataMessagesHome(receiveResponseConnection)
            answerUser(data)
          }
          
        },3000)
     
        this.setState({
          idUser:decode.id
        })
        
        if(Platform.OS ==="android"){
          try{
            const granted = await request(PERMISSIONS.ANDROID.RECORD_AUDIO)
            const storage = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
            this.permission = granted
            this.writeExternalStorage = storage 
         
          }catch(err){
              console.log("eroor ====== >",err)
          }
        }


        
        }

    goToMyQuestion= async ()=>{
        this.setState({
      
        filter:undefined
      })
      this.props.navigation.navigate("MyQuestions")
        // const allMessages =  this.state._messages
        // console.log("je suis dans chat home pour alllmessages ",allMessages)
      
    }

    

     componentWillUnmount(){

      clearInterval(timerMessage)
     }


  


  render() {
 
   const { 
    alertVisible,
    alertText,
    alertConfirm 
    ,style}=this.state

    return (
       
        <View   style={Style.container}>
            <MyQuestionsContainer
             navigation = {this.props.navigation}
             currentScreen ="ChatHome"
             
            />
      <View style={Style.containerButton} >
        <Button  
        title="Poser une question" 
        buttonStyle={{ borderRadius:20,padding:10,marginBottom:5}} 
        onPress={this.goToMyQuestion} />
      </View>

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

export default ChatHome;
