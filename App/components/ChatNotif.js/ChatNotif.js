import React, { Component } from 'react';
import { View, Text } from 'react-native';
import ViewBubble from "../MyQuestions/ViewBubble"

class ChatNotif extends Component {

      state={
            ProfileUser:undefined,
            dataMessageCurrent:undefined,
            isQuestion:undefined,
            showAboveInput:undefined ,
            answerCurrent:undefined

      }


    static async getDerivedStateFromProps(props, state){ 
              
   
        if(props.dataProfileUser){
         // console.log("message ===",props.dataFilterMyquestion )
         state.ProfileUser = props.dataProfileUser.data
           if(props.allDataMessagesHome){
             
             state._messages = props.allDataMessagesHome
             
           }
       
        }

        if(props.dataFilterMyquestion && state.filter){
         state._messageFilter =props.dataFilterMyquestion
        }else{
         state._messageFilter =undefined
        } 

    }

    async  onSend(messages = []) {
        const { ProfileUser , dataMessageCurrent,isQuestion } = this.state
       
        const {_id ,
          createdAt ,
          text ,
          user  ,
          recordDuration,
          recordPosition} = messages[0]
    
         const {receiveResponseConnection } = this.props
     
         const newMessage = [{
           _id,
           createdAt,
           text,
           user,
           recordDuration,
           recordPosition,
           token: receiveResponseConnection
         }]
       console.log("profiluser dans on send ",dataMessageCurrent)
      
        if(ProfileUser.roleTitle !== "Administrateur" ){
          
          this.props.sendMessageUser(newMessage)
    
    
        }else {
          if(isQuestion){
            let data = this._dataInfo(text)
            data.idMessage = dataMessageCurrent.idMessage
            data.idAnwsersUser = dataMessageCurrent.idAnwsersUser 
            this.props.sendPrecisionForQuestion(data) 
       
          }else{
            let data = this._dataInfo(text)
            data.idMessage = dataMessageCurrent.idMessage
            this.props.sendAnswersForQuestion(data) 
          }
          this.setState({
            answerCurrent:undefined,
            showAboveInput:false,
            dataMessageCurrent:undefined
          })
      
        }          
         
      
    
      }

    renderBubble(props) {
        const { type ,createdAt ,question, text ,user ,idMessage,_id} = props.currentMessage
        const { ProfileUser } = this.state
       
        var minutes = createdAt.getMinutes() 
        const dataMessageCurrent = new Object
        dataMessageCurrent.idAnwsersUser = user._id
        dataMessageCurrent.idMessage= idMessage
     
     
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
          }else if( question || ProfileUser && ProfileUser.roleTitle === "Administrateur"){
     
             return (
               <ViewBubble
               text={text}
               question={question}
               createdAt={createdAt}
               user={user}
               profileUser={ProfileUser.roleTitle}
               minutes={minutes}
               showMessage={(res)=>this.setState({
                 answerCurrent:text,
                 showAboveInput:true,
                 dataMessageCurrent:dataMessageCurrent,
                 isQuestion:res
               })}
               />
                );
           }else {  
             return(
               <Bubble
                   
               {...props}
             
             />
             ) 
           
           }

       }

       renderSend(props) {
        return (
         
          <Send {...props} label={<Icon name="paper-plane" />} />
    
        );
      }

      renderComposer=()=> {
        
        const { showAboveInput , answerCurrent} = this.state
      
       
      if(showAboveInput){
        
        return(
          
          <View style={Style.renderComposer}>
              <Text style={Style.closeTextRenderComposer}
              onPress={()=>this.setState({
                answerCurrent:"",
                showAboveInput:false,
                dataMessageCurrent:undefined
              })}
              >x</Text>
              <View style={Style.textRenderComposer}>
                <Text >
                  { answerCurrent } 
                </Text>
                
              </View>
            
          </View>
          
        )
      }
     
      } 


  renderInputToolbar(props) {

    return(
      <InputToolbar
      containerStyle={{paddingTop:5}}
      {...props}
      />
    ); 
  }


  renderActions=(props)=>{
 
    const { ProfileUser, stop  } = this.state
    if(ProfileUser !== undefined && ProfileUser.roles[0]=== "ROLE_ADMIN"){
      if (stop){
        return (
          <TouchableOpacity style={{marginBottom:10,marginLeft:10}}>
          <Icon name="mic-off"  {...props} onPress={()=>this.onStopRecord()}/>
          </TouchableOpacity>
        )
      }else{
        return (
          <TouchableOpacity style={{marginBottom:10,marginLeft:10}}>
          <Icon name="mic"  {...props} onPress={()=>this.onStartRecord()}/>
          </TouchableOpacity>
        )
      }
    }
    
  }
     
  render() {
    return (
        <GiftedChat
        inverted={true}
        scrollToBottom={true}
        messages={_messages}
        shouldUpdateMessage={()=>_messages}
        onSend={messages => this.onSend(messages)}
        renderUsernameOnMessage={true}
        renderAvatar={null}
        isAnimated= {true}
        minInputToolbarHeight={60}
        placeholder="Entrer un message..."
        style={{background:'red'}}  
        keyboardShouldPersistTaps={'never'}
        renderBubble={(props)=>this.renderBubble(props)}
        renderSend={this.renderSend}
        renderInputToolbar={this.renderInputToolbar}
        renderActions={this.renderActions}
        timeFormat='HH:mm'
        user={{
        _id: ProfileUser ? ProfileUser.id : "user",

      
    }}
  />
    );
  }
}

export default ChatNotif;
