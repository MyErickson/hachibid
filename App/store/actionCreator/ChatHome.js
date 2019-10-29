import {RECEIVE_MESSAGES_HOME,DATA_MESSAGES_HOME,SEND_DATA_FILTER_HOME_MESSAGE,RECEIVE_DATA_FILTER_MESSAGES_HOME} from '../reducer'

export const receiveMessagesHome=(allMessageHome)=>({
    type:RECEIVE_MESSAGES_HOME,
    allMessageHome
  })
export const dataMessagesHome=(token)=>({
    type:DATA_MESSAGES_HOME,
    token,
  })

export const sendDataFilterHomeMessage=(data)=>({
    type: SEND_DATA_FILTER_HOME_MESSAGE,
    data
   })
   
// export const receiveDataMessagesHome=(dataMessagesHome)=>({
//      type:RECEIVE_DATA_MESSAGES_HOME,
//      dataMessagesHome
//    })
export const receiveDataFilterMessagesHome=(dataFilterMessage)=>({
    type:RECEIVE_DATA_FILTER_MESSAGES_HOME,
    dataFilterMessage
  })