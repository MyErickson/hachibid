import React from 'react';
import { Text, View } from 'react-native';
import Modal from "react-native-modal";
import { Button, Icon as  IconElement, Slider } from 'react-native-elements';
import {  Icon  } from 'native-base';
import { Style } from './styleMyQuestions'
const PlaySound = ({
    isModalVisible,
    toggleModal,
    onStartPlay,
    onPausePlay,
    play,
    propsSounder
}) =>{
//  console.log('propsssssss',propsSounder)
    // const { text } = propsSounder.currentMessage

 return(
    <Modal style={Style.Modal} 
    isVisible={isModalVisible}
    backdropTransitionOutTiming={0}
    >
    <View  style={Style.recorderPlaySound}>
          {play?<IconElement  style={Style.iconRecorder} size={35} name="pause" onPress={()=> onPausePlay()}/>  
          :<Icon style={Style.iconRecorder} name="play" onPress={()=>onStartPlay()}/> }
          <Slider
          style={{flex:1}}
          minimumValue={2}
          maximumValue={6}
          thumbStyle={{backgroundColor:'blue'}}
          value={5}
          onValueChange={value => { value }}
        />
      </View>
      {/* <Text>{text}</Text> */}
      <Button
            title="fermer"
            containerStyle={Style.button}
            onPress={()=>toggleModal()}
            buttonStyle={{borderRadius:10}}
            type='outline'
        />
    </Modal>
);
 }
export default PlaySound;
