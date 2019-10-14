import React, { Component } from 'react';
import { View,  Text,  TouchableOpacity , Platform } from 'react-native';
import {Icon as IconElement} from 'react-native-elements';
import {Icon } from 'native-base'
import { Style} from './styleMyQuestions';
import Menu from '../Menu/Menu'
import Filtrate from '../Filtrate/Filtrate'
import {request, PERMISSIONS} from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { GiftedChat , Bubble, Send , InputToolbar, Message,} from 'react-native-gifted-chat'
import PlaySound from './PlaySound';



class MyQuestions extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages:undefined,
      recordSecs:undefined,
      recordTime:undefined,
      currentPositionSec:undefined,
      currentDurationSec:undefined,
      playTime:undefined,
      duration:undefined,
      stop:false,
      play:false,
      isModalVisible:false,
      propsSounder:undefined


    };
    //  this.play= false
    this.permission = undefined;
    this.writeExternalStorage = undefined ;
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.path = Platform.select({
      ios: 'hello.m4a',
      android: `sdcard/Music/${Date.now()}.mp4`
    })
  }
    
    async componentDidMount() {
    //  await this.props.receiveDataMessageMyQuestions()
    //  const allMessages =  await this.props.dataMessagesMyQuestions
    // console.log(PERMISSIONS.ANDROID.RECORD_AUDIO)
      try{
        const granted = await request(PERMISSIONS.ANDROID.RECORD_AUDIO)
        const storage = await request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
        this.permission = granted
        this.writeExternalStorage = storage 
       
      }catch(err){
          console.log("eroor ====== >",err)
      }
    
      this.setState({
        messages: [
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            type:'message',
            user: {
              _id: 2,
              name: 'erickson',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ],
      })
    }


    searchBar= async (text)=>{
      //   await this.props.sendDatafilterMessage(text)
      //   const _messages = await this.props.receiveDataFilter
      // this.setState({
      //     _messages
      // })
      console.log(text)
    }



 
// ******************************* Mehtode GiftedChat *******************************
  async onSend(messages = []) {
     const {_id , createdAt , text , user } = messages[0]
     const newMessages = [{
       _id,
       createdAt,
       text,
       type:'message',
       user
     }]

    this.setState(previousState =>({
      messages: GiftedChat.append(previousState.messages, newMessages),
    }))
    // await this.props.sendMessageUser(messages)
    // const allMessages =  await this.props.dataMessages
    // this.setState(previousState => ({
    //       messages: allMessages ,
    //     }))
  }



  renderBubble(props) {
   const { type  } = props.currentMessage
     if(type === "record"){
   
       return (
        <View  style={Style.recorder}>
          {/* {this.play?<IconElement name="stop" onPress={()=>this.onStopPlay()}/>  
          :<Icon name="play" onPress={()=>this.toggleModal()}/> } */}
         
        <Text onPress={()=>this.toggleModal(props)} style={{marginLeft:15}}>Message vocal</Text>
        
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

  renderSend(props) {
    return (
     
      <Send {...props} label={<Icon name="paper-plane" />} />

    );
  }
 
  renderInputToolbar(props) {
  
    return(
      <InputToolbar
      containerStyle={{paddingTop:10}}
      
      {...props}
      />
    ); 

  }

  renderActions=(props)=>{
    const { stop } = this.state
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


// ******************************* Mehtode Soundrecorder *******************************

  soundRecording =async()=>{
    
  
      
  }



  onStartRecord = async () => {
    const { stop } =this.state
    this.setState({
      stop:!stop
    })
    this.patch
    const result = await this.audioRecorderPlayer.startRecorder(this.path);
  
    this.audioRecorderPlayer.addRecordBackListener((e) => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position),
        ),
        
      });
      return;
    });
  
  };
   
  onStopRecord = async () => {
    const { stop } =this.state
    this.setState({
      stop:!stop
    })

   const result = await this.audioRecorderPlayer.stopRecorder(this.path);

    this.audioRecorderPlayer.removeRecordBackListener(this.path);
   
    this.setState(previousState=>({
      recordSecs: 0,
      messages: GiftedChat.append(previousState.messages,  {
        _id:Date.now(),
        text: result,
        createdAt: new Date(),
        recordSecs:this.state.recordTime,
        type:'record',
        user: {
          _id:'Id user',
          name: 'Id user',
      
        },
      },),
    }));
     

  };

  onStartPlay = async () => {
    console.log('onStartPlay');
    const { play } = this.state
    this.setState({
      play:true
    })
  
    
    const msg = await this.audioRecorderPlayer.startPlayer(this.path);
    console.log("msg ==>",msg);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      console.log(e)
      if (e.current_position === e.duration) {
        console.log('finished');
        // this.audioRecorderPlayer.stopPlayer(this.path);
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
        
      });

      console.log('duuuuration',this.state.playTime)
    });
   
  };

  onPausePlay = async () => {
    console.log('onPausePlay');
    this.setState({play:false})
    await this.audioRecorderPlayer.pausePlayer();
  
  };


 // ******************** Modal *******************

 toggleModal=(props)=>{
   const { isModalVisible } = this.state
  this.setState({isModalVisible: !isModalVisible,
                propsSounder:props
  })
 }






  render() {
   

    return (
    
      <View  style={Style.container}>
        <Menu nameMenu="Mes questions" toggle={this.props.navigation.toggleDrawer}/>
       <PlaySound 
       isModalVisible={this.state.isModalVisible}
       toggleModal={this.toggleModal}
       onStartPlay={this.onStartPlay}
       onPausePlay ={this.onPausePlay}
       play={this.state.play}
       propsSounder={this.state.propsSounder}
       />
        <View style={Style.messageContainer}>
            <Filtrate searchBar={this.searchBar} />
              <GiftedChat
                messages={this.state.messages}
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
                user={{
                  _id: 'Id user',
                  
                }}
              />
    
        </View>
       

      </View>
    );
  }
}

export default MyQuestions;