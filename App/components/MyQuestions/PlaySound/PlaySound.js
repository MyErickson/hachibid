import React from 'react';
import { View ,Dimensions} from 'react-native';
import Modal from "react-native-modal";
import { Icon as  IconElement} from 'react-native-elements';
import { ProgressBar, } from 'react-native-paper';
import {  Icon  } from 'native-base';
import { Style } from '../styleMyQuestions'

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";



const PlaySound = ({
    isModalVisible,
    closeModal,
    onStartPlay,
    onPausePlay,
    play,
    propsSounder,
 
    currentPositionSec
}) =>{

  var progress =propsSounder && currentPositionSec/parseInt(propsSounder.currentMessage.audio.duration);

 if(progress > 1.1){
   progress=0
 }
 const Width = Dimensions.get('window').width 
 const Height = Dimensions.get('window').height 
 return(

      <Modal style={Width > Height ? Style.ModalLandscape:Style.ModalPortrait} 
        isVisible={isModalVisible}
        backdropTransitionOutTiming={0}
     
      >
        <View style={Style.iconClose} >
        <Icon  name="close" onPress={()=>closeModal()}/> 
        </View>
          
      <View  style={Style.recorderPlaySound}>
            {play?<IconElement  style={Style.iconRecorder} size={35} name="pause" onPress={()=>onPausePlay(propsSounder,currentPositionSec)
        }/>  
            :<Icon style={Style.iconRecorder} name="play" onPress={()=>onStartPlay(propsSounder)}/> }

          {<ProgressBar progress={progress?progress:0} style={{width:wp("70%"),top:hp("2.1%")}} color={	"#404040"} /> }
        </View>
      </Modal>

);
 }
export default PlaySound;
