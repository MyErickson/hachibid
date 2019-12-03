import React from 'react'
import { ScrollView,View,Text  } from 'react-native'
import { Card, ListItem ,Icon} from 'react-native-elements'
import Playsound from '../../MyQuestions/PlaySound/PlaySound'
import { Style } from '../styleNotification'
import { bold } from 'ansi-colors'

const  ViewViewRecording =({ 
    isModalVisible,
    toggleModal,
    onPausePlay,
    onPausePlay,
    play,
    duration,
    propsSounder,
    currentPositionSec
})=> {
  
        return (
          <Playsound 
          isModalVisible={isModalVisible}
          toggleModal={this.toggleModal}
          onStartPlay={this.onStartPlay}
          onPausePlay ={this.onPausePlay}
          play={play}
          propsSounder={propsSounder}
          duration={duration}
          currentPositionSec={currentPositionSec}
          />
        )
    
}

export default ViewRecording
