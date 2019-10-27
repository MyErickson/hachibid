import React from 'react';
import { Text, View } from 'react-native';
import Modal from "react-native-modal";
import { Button, Icon as  IconElement, Slider } from 'react-native-elements';
import { ProgressBar, Colors } from 'react-native-paper';
import {  Icon  } from 'native-base';
import { Style } from './styleMyQuestions'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";


const PlaySound = ({
    isModalVisible,
    toggleModal,
    onStartPlay,
    onPausePlay,
    play,
    propsSounder,
    currentPositionSec
}) =>{
  // console.log('propsssssss',currentPositionSec,currentDurationSec)
//  console.log('play sound propsSounder ===>',propsSounder)
    // const { text } = propsSounder.currentMessage
   
   
//   if(t >= 1){
//       t=0
//     }
console.log("temps de la progression  ======>", currentPositionSec )
  var progress =propsSounder && currentPositionSec/propsSounder.currentMessage.recordDuration;

 if(progress > 1.1){
   progress=0
 }

 return(
    <Modal style={Style.Modal} 
    isVisible={isModalVisible}
    backdropTransitionOutTiming={0}
    >
        <Icon style={Style.iconClose}  name="close" onPress={()=>toggleModal()}/> 
    <View  style={Style.recorderPlaySound}>
          {play?<IconElement  style={Style.iconRecorder} size={35} name="pause" onPress={()=>onPausePlay(propsSounder,currentPositionSec)
      }/>  
          :<Icon style={Style.iconRecorder} name="play" onPress={()=>onStartPlay(propsSounder)}/> }

        {<ProgressBar progress={progress?progress:0} style={{width:wp("70%"),top:hp("2.5%")}} color={	"#404040"} /> }
      </View>
    </Modal>
);
 }
export default PlaySound;
