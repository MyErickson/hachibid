import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Style } from './styleMessageCategory'
import Filtrate from '../Filtrate/Filtrate'
import Menu from '../Menu/Menu';
import AsyncStorage from '@react-native-community/async-storage';
import { dataProfileUsers } from '../../store/actionCreator/Profile';

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
        idUser:undefined
        
    };
 
  }
  
    static  getDerivedStateFromProps(props, state){
    const { params } = props.navigation.state
    
        props.navigation.closeDrawer()
        state._messages=undefined
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
   

  //  renderBubble(props) {
  //   const { type ,createdAt , question , text ,user } = props.currentMessage
  //   console.log("answer dans le renderbubble",props.currentMessage)
  //   var minutes = createdAt.getMinutes() 
  //   if(createdAt.getMinutes() < 10){
  //    minutes = `0`+createdAt.getMinutes()
  //        }
  //     if(type === "record"){
    
       
  //       return (
  //        <View style={Style.recorder}>    
  //          <Text  onPress={()=>this.toggleModal(props)} style={{margin:5}}>Message vocal, Click pour lecture</Text>
  //          <Text  style={{fontSize:11, textAlign:"right",marginRight:5}}>{`${createdAt.getHours()}:${minutes}`}</Text>
         
  //        </View>
  //       )
  //     }else{
  //      if(question){
  //        return(
  //            <View style={Style.answer}> 
  //                 <View style={{backgroundColor:"#AEECDD",borderRadius:5}}>
  //                 <Text  style={{marginLeft:5,marginTop:5,fontWeight:"bold"}}>{question.name}</Text>   
  //                 <Text  style={{margin:5}}>{question.text}</Text>   
  //                 </View>
              
  //                <Text  style={{margin:5,marginBottom:10,marginTop:10}}>{text}</Text>
            
  //              <View style={{flexDirection:"row"}}>
  //                <Text  style={{fontSize:11, marginLeft:8}}>{`~${user.name}`}</Text>
  //                <Text  style={{fontSize:11, marginLeft:20}}>{`${createdAt.getHours()}:${minutes}`}</Text>
  //                <TouchableOpacity
  //                  onPress={()=>this.alertPrecision(props.currentMessage)}
  //                >
  //                 <Text  style={{fontSize:11, marginLeft:80,color:"green",fontWeight:"bold",marginRight:20}}>plus de précision</Text>
  //                </TouchableOpacity>
  //              </View>
  //            </View>
  //        )
  //      }else{
  //        return (
           
  //            <Bubble
               
  //              {...props}
             
  //            />
  //           );
  //      }
       
      
  //     }
 
     
  //  }
 

  render() {
     const { _messages,title,deleteTextSearchBar,filter ,_messageFilter,_textFilter,idUser }=this.state

     const { dataProfileUser } = this.props
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
                // renderBubble={(props)=>this.renderBubble(props)}
                renderUsernameOnMessage={true}
                timeFormat='HH:mm'
                user={{
                  _id: idUser && idUser,
                  
                }}
              />
    
        </View>
       

      </View>
    );
  }
}

export default MessageCategory;
