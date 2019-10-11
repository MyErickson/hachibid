import {SEND_MESSAGE_USER,RECEIVE_DATA_MESSAGES_MYQUESTIONS,DATA_MESSAGES_MYQUESTIONS} from '../reducer'

export const sendMessageUser =( message ) =>({
    type: SEND_MESSAGE_USER,
    message
  })

export const receiveDataMessagesMyQuestions=()=>({
  type:RECEIVE_DATA_MESSAGES_MYQUESTIONS,

})
  
export const DataMessagesMyQuestions=(dataMessageMyQuestions)=>({
  type:DATA_MESSAGES_MYQUESTIONS,
  dataMessageMyQuestions
})
  