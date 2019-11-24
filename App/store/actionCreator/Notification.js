import {  DATA_MESSAGES_HOME, ALL_PRECISION,RECEIVE_ALL_PRECISION } from "../reducer";


export const notificationPrecision=(data)=>({
    type: ALL_PRECISION,
    data
  
})

export const receiveAllPrecision =(allPrecision) =>({
    type:RECEIVE_ALL_PRECISION,
    allPrecision
})

export const notificationQuestion=(data)=>({
    type:DATA_MESSAGES_HOME ,
    data

})
