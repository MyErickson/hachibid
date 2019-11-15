import {SEND_MESSAGE_USER,RECEIVE_DATA_MESSAGES_MYQUESTIONS,DATA_MESSAGES_MYQUESTIONS ,
   SEND_DATA_FILTER_MESSAGE_MYQUESTION,RECEIVE_PRECISION,RECEIVE_DATA_FILTER_MESSAGE_MYQUESTION,
   SEND_ANSWERS_FOR_QUESTION,SEND_PRECISION_FOR_QUESTION} from '../reducer'

export const sendMessageUser =( message ) =>({
    type: SEND_MESSAGE_USER,
    message
  })

export const receiveDataMessagesMyQuestions=(data)=>({
  type:RECEIVE_DATA_MESSAGES_MYQUESTIONS,
  data
})
  
export const DataMessagesMyQuestions=(dataMessagesMyQuestions)=>({
  type:DATA_MESSAGES_MYQUESTIONS,
  dataMessagesMyQuestions
})
  
export const sendDatafilterMessageMyQuestion=(data)=>({
  type:SEND_DATA_FILTER_MESSAGE_MYQUESTION,
  data
})

export const receiveDatafilterMessageMyQuestion=(dataFilterMyquestion)=>({
  type:RECEIVE_DATA_FILTER_MESSAGE_MYQUESTION,
  dataFilterMyquestion
})
export const receivePrecision=(data)=>({
  type:RECEIVE_PRECISION,
  data
})
export const sendAnswersForQuestion =(data)=>({
  type:SEND_ANSWERS_FOR_QUESTION,
  data
})

export const sendPrecisionForQuestion = (data)=>({
  type:SEND_PRECISION_FOR_QUESTION,
  data
})