import {SEND_DATA_FILTER_MESSAGES_CATEGORY,RECEIVE_DATA_MESSAGES_CATEGORY,DATA_MESSAGES_CATEGORY,DATA_FILTER_MESSAGES_CATEGORY} from '../reducer'

export const sendDatafilterMessageCategory=(data)=>({
    type: SEND_DATA_FILTER_MESSAGES_CATEGORY,
    data
  })
  
  export const receiveDataMessagesCategory=(data)=>({
    type:RECEIVE_DATA_MESSAGES_CATEGORY,
    data
  })

  export const dataMessagesCategory=(messagesCategory)=>({
    type:DATA_MESSAGES_CATEGORY,
    messagesCategory
  })

  export const dataFilterMessagesCategory=(dataFilterMessagesCategory)=>({
    type:DATA_FILTER_MESSAGES_CATEGORY,
    dataFilterMessagesCategory
  })
