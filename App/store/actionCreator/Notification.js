import { DATA_NOTIFICATION, RECEIVE_DATA_NOTIFICATION } from "../reducer";


export const DataNotification=()=>({
    type:DATA_NOTIFICATION,
  
})

export const receiveDataNotification=(dataNotification)=>({
    type:RECEIVE_DATA_NOTIFICATION,
    dataNotification

})
