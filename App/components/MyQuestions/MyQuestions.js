import React, { Component } from 'react';
import { View,  Text,  TouchableOpacity , Platform } from 'react-native';
import { Style} from './styleMyQuestions';
import { Icon ,Input } from 'native-base'
import Menu from '../Menu/Menu'
import Filtrate from '../Filtrate/Filtrate'
import {request, PERMISSIONS} from 'react-native-permissions';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import { GiftedChat , Bubble, Send , InputToolbar,} from 'react-native-gifted-chat'
var date = Date.now()

class MyQuestions extends Component {
  constructor(props){
    super(props);
    this.state = {
      messages:undefined,
      recordSecs:undefined,
      recordTime:undefined,
      stop:false,

    };
    this.paly= false
    this.permission = undefined;
    this.writeExternalStorage = undefined ;
    this.audioRecorderPlayer = new AudioRecorderPlayer();
    this.path=  Platform.select({
      ios: 'hello.m3a',
      android: `sdcard/Music/${date}.mp3`, 
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
 

  async onSend(messages = []) {
     

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
    // await this.props.sendMessageUser(messages)
    // const allMessages =  await this.props.dataMessages
    // this.setState(previousState => ({
    //       messages: allMessages ,
    //     }))
  }

  soundRecording =async()=>{
   
 
    
  }


  renderBubble(props,onStartPlay,onStopPlay) {
    const { type ,text,recordSecs } = props.currentMessage

    const  nameRecord = text.split('/')
     if(type === "record"){
  
       return (
        <View  style={Style.recorder}>
          {this.play ?<Icon name="mic-off" onPress={()=>onStopPlay()}/>  
          :<Icon name="play" onPress={()=>onStartPlay()}/> }
         
        <Text style={{marginLeft:15}}>{nameRecord[4]}</Text>
        
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


  searchBar= async (text)=>{
    //   await this.props.sendDatafilterMessage(text)
    //   const _messages = await this.props.receiveDataFilter
    // this.setState({
    //     _messages
    // })
    console.log(text)
  }

  onStartRecord = async () => {
    const { stop } =this.state
    this.setState({
      stop:!stop
    })
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
    console.log("backlistener===>",result);
  };
   
  onStopRecord = async () => {
    const { stop } =this.state
    this.setState({
      stop:!stop
    })
    const result = await this.audioRecorderPlayer.stopRecorder(this.path);
     this.audioRecorderPlayer.removeRecordBackListener();
 
    this.setState(previousState=>({
      recordSecs: 0,
      messages: GiftedChat.append(previousState.messages,  {
        _id:'Id user',
        text: result,
        createdAt: new Date(),
        recordSecs:this.state.recordTime,
        type:'record',
        user: {
          _id:'Id user',
          name: 'Id user',
          avatar: 'https://placeimg.com/140/140/any',
      
        },
      },),
    }));
     
    console.log(result);

  };

  onStartPlay = async () => {
    console.log('onStartPlay');
    this.play = true
    const msg = await this.audioRecorderPlayer.startPlayer(this.path);
    console.log(msg);
    this.audioRecorderPlayer.addPlayBackListener((e) => {
      if (e.current_position === e.duration) {
        console.log('finished');
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(Math.floor(e.current_position)),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration)),
       
      });
      return;
    });
  };

  onStopPlay = async () => {
    console.log('onStopPlay');
    this.play = false
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  render() {
   

    return (
    
      <View  style={Style.container}>
        <Menu nameMenu="Mes questions" toggle={this.props.navigation.toggleDrawer}/>
      
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
                renderBubble={(props)=>this.renderBubble(props,this.onStartPlay,this.onStopPlay)}
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