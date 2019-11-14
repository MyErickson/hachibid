import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Style } from './styleMessageCategory'
import Filtrate from '../Filtrate/Filtrate'
import Menu from '../Menu/Menu';
import AsyncStorage from '@react-native-community/async-storage';
import {  Bubble} from 'react-native-gifted-chat'
import AlertDialog from '../AlertDialog/AlertDialog'

class MessageCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        _messages:undefined,
        title:"",
        deleteTextSearchBar:undefined,
        _messageFilter:undefined,
        filter:undefined,
        _textFilter:undefined,
        idUser:undefined,
        alertVisible:false,
        alertText :undefined,
        alertConfirm:undefined,
        style:undefined,
        currentMessageForPrecision:undefined
        
    };
 
  }
  
    static  getDerivedStateFromProps(props, state){
    const { params } = props.navigation.state
    
        props.navigation.closeDrawer()
        state.title = params.nameCategory
        state._messageFilter = props.filterMessagesCategory
        state._messages= props.dataMessagesCategory
        if(props.dataProfileUser){
          state.idUser = props.dataProfileUser.data.id
        }
       
  
    }

    searchBar= (text)=>{
       const {sendDatafilterMessageCategory,dataFilterMessagesCategory, receiveResponseConnection , navigation}=this.props

    
   
      if(text && text.length > 2 ){
        let data = new Object
        data.text = text
        data.token = receiveResponseConnection
        data.id = navigation.state.params.id
        sendDatafilterMessageCategory(data)
    
        this.setState({
          filter:true,
          deleteTextSearchBar:true,
        })  
    
      }else if (text ){
        dataFilterMessagesCategory()
        this.setState({ deleteTextSearchBar:true,
          _messageFilter: undefined
        })     
      }else{
        dataFilterMessagesCategory()
          this.setState({
            filter:false,
            deleteTextSearchBar:false,
            _messageFilter: undefined
         }) 
        }
        this.setState({
          _textFilter : text
      })

  
   }
   

   renderBubble(props) {
    const { type ,createdAt , question , text ,user } = props.currentMessage
    console.log("answer dans le renderbubble",props.currentMessage)
    var minutes = createdAt.getMinutes() 
    if(createdAt.getMinutes() < 10){
     minutes = `0`+createdAt.getMinutes()
         }
      if(type === "record"){
    
       
        return (
         <View style={Style.recorder}>    
           <Text  onPress={()=>this.toggleModal(props)} style={{margin:5}}>Message vocal, Click pour lecture</Text>
           <Text  style={{fontSize:11, textAlign:"right",marginRight:5}}>{`${createdAt.getHours()}:${minutes}`}</Text>
         
         </View>
        )
      }else{
       if(question){
         return(
             <View style={Style.answer}> 
                  <View style={{backgroundColor:"#AEECDD",borderRadius:5}}>
                  <Text  style={{marginLeft:5,marginTop:5,fontWeight:"bold"}}>{question.name}</Text>   
                  <Text  style={{margin:5}}>{question.text}</Text>   
                  </View>
              
                 <Text  style={{margin:5,marginBottom:10,marginTop:10}}>{text}</Text>
            
               <View style={{flexDirection:"row"}}>
                 <Text  style={{fontSize:11, marginLeft:8}}>{`~${user.name}`}</Text>
                 <Text  style={{fontSize:11, marginLeft:20}}>{`${createdAt.getHours()}:${minutes}`}</Text>
                 <TouchableOpacity
                     onPress={()=>this.alertPrecision(props.currentMessage)}
                     style={{flexDirection:"row"}}
                   >
                    <Text  style={{fontSize:11, marginLeft:80,color:"green",fontWeight:"bold",marginTop:3}}>plus de précision</Text>
                    <Text style={{fontSize:15, color:"green",fontWeight:"bold",marginRight:20}}> + </Text>
            
                   </TouchableOpacity>
               </View>
             </View>
         )
       }else{
         return (
           
             <Bubble
               
               {...props}
             
             />
            );
       }
       
      
      }
 
     
   }
 

   alertPrecision = (currentMessageForPrecision)=>{
    this.setState({
      alertVisible:true,
      alertText:"êtes vous sur de vouloir faire une demande de plus de précision ?",
      alertConfirm:true,
      style:false,
      currentMessageForPrecision
    })
  }

  closeAlert=()=>{
    this.setState({
      alertVisible:false,
      currentMessageForPrecision:undefined

    })
  }
  sendPrecision=()=>{
    const { currentMessageForPrecision } = this.state
  
    
    let data = new Object;

    data.content = currentMessageForPrecision.text
    data.message = currentMessageForPrecision.idMessage
    data.userQuestion = currentMessageForPrecision.question.idUser
    data.token = this.props.receiveResponseConnection

    this.props.askPrecision(data)
    this.setState({
      alertText:"Une demande de precision à bien été envoyé",
      alertConfirm:false,
      style:true,
      currentMessageForPrecision:undefined

    })
  }


  render() {
     const { _messages,
      title,
      deleteTextSearchBar,
      filter ,
      _messageFilter,
      _textFilter,
      idUser,
      alertVisible,
      alertText,
      alertConfirm,
      style

     }=this.state

 

    return (
             
        <View   style={Style.container}>
        <Menu nameMenu={title} navigation={this.props.navigation}/>
      
        <View style={Style.messageContainer}>
        <Filtrate searchBar={this.searchBar} textFilter={_textFilter } deleteTextSearchBar={deleteTextSearchBar}/>
              <GiftedChat
                scrollToBottom={true}
                messages={filter?_messageFilter:_messages}
                renderAvatar={null}
                shouldUpdateMessage={()=>_messages}
                minInputToolbarHeight={20}
                placeholder="Entrer un message..."
                renderInputToolbar={()=>undefined}
                style={{background:'red'}}  
                keyboardShouldPersistTaps={'never'}
                renderBubble={(props)=>this.renderBubble(props)}
                renderUsernameOnMessage={true}
                timeFormat='HH:mm'
                user={{
                  _id: idUser && idUser,
                  
                }}
              />
    
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

export default MessageCategory;
