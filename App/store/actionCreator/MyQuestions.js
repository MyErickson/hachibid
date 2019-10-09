import {SEND_MESSAGE_USER,RECEIVE_DATA_MESSAGES_MYQUESTIONS} from '../reducer'

export const sendMessageUser =( message ) =>({
    type: SEND_MESSAGE_USER,
    message
  })

export const receiveDataMessagesMyQuestions=(dataMessageMyQuestions)=>({
  type:RECEIVE_DATA_MESSAGES_MYQUESTIONS,
  dataMessageMyQuestions
})
  
  