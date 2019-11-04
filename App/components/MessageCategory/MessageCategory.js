import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { Style } from './styleMessageCategory'
import Filtrate from '../Filtrate/Filtrate'
import Menu from '../Menu/Menu';
import AsyncStorage from '@react-native-community/async-storage';

class MessageCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
        _messages:undefined,
        title:"",
        deleteTextSearchBar:undefined,
        _messageFilter:undefined,
        filter:undefined,
        _textFilter:undefined
        
    };
 
  }
  
    static  getDerivedStateFromProps(props, state){
    const { params } = props.navigation.state

         console.log("je suis dans get derirev message category",props.dataFilterMessagesCategory)
         console.log("je suis dans get derirev message category",state._messageFilter)
         console.log("je suis dans get derirev 2nd message category",props.dataMessagesCategory)
        props.navigation.closeDrawer()
        if(state._messageFilter  === props.dataFilterMessagesCategory){
          state.filter= undefined
          state._messageFilter= props.dataFilterMessagesCategory
        }else {
          state._messageFilter= props.dataFilterMessagesCategory
        }
        state.title = params.nameCategory
        state._messages=  props.dataMessagesCategory
        
  
    }

    searchBar= async (text)=>{
       const {sendDatafilterMessageCategory, receiveResponseConnection , navigation}=this.props

       const _textFilter = text
       this.setState({
           _textFilter 
       })

  
      if(text && text.length > 2 ){
        let data = new Object
        data.text = text
        data.token = receiveResponseConnection
        data.id = navigation.state.params.id
        await sendDatafilterMessageCategory(data)
        this.setState({
          filter:true,
          deleteTextSearchBar:true,
        })    
      }else if (text){
        this.setState({ deleteTextSearchBar:true})     
      }else{
          this.setState({
            filter:false,
            deleteTextSearchBar:false
          
         }) 
        }
  
   }
   
 

  render() {
     const { _messages,title,deleteTextSearchBar,filter ,_messageFilter,_textFilter }=this.state
   
   
    return (
             
        <View   style={Style.container}>
        <Menu nameMenu={title} navigation={this.props.navigation}/>
      
        <View style={Style.messageContainer}>
        <Filtrate searchBar={this.searchBar} textFilter={_textFilter } deleteTextSearchBar={deleteTextSearchBar}/>
              <GiftedChat
                scrollToBottom={true}
                messages={filter?_messageFilter :_messages}
                renderAvatar={null}
                isAnimated= {true}
                minInputToolbarHeight={20}
                placeholder="Entrer un message..."
                renderInputToolbar={()=>undefined}
                style={{background:'red'}}  
                keyboardShouldPersistTaps={'never'}
                renderUsernameOnMessage={true}
                user={{
                  _id: 'Id user',
                  
                }}
              />
    
        </View>
       

      </View>
    );
  }
}

export default MessageCategory;
