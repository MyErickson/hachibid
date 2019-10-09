import {SEND_DATA_FILTER_MESSAGES_CATEGORY,RECEIVE_DATA_MESSAGES_CATEGORY,DATA_MESSAGES_CATEGORY,DATA_FILTER_MESSAGES_CATEGORY} from '../reducer'

export const sendDatafilterMessageCategory=(category)=>({
    type: SEND_DATA_FILTER_MESSAGES_CATEGORY,
    category
  })
  
  export const receiveDataMessagesCategory=(dataMessagesCategory)=>({
    type:RECEIVE_DATA_MESSAGES_CATEGORY,
    dataMessagesCategory
  })

  export const dataMessagesCategory=(messagesCategory)=>({
    type:DATA_MESSAGES_CATEGORY,
    messagesCategory
  })

  export const dataFilterMessagesCategory=(dataFilterMessagesCategory)=>({
    type:DATA_FILTER_MESSAGES_CATEGORY,
    dataFilterMessagesCategory
  })
