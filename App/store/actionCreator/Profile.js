import {RECEIVE_DATA_UPDATE_PROFILE,SEND_DATA_UPDATE_PROFILE,DATA_PROFILE_USERS,RECEIVE_DATA_PROFILE,INITITALIZE_STATE} from '../reducer'

export const receiveDataUpdateProfile=(ProfileUser)=>({
    type:RECEIVE_DATA_UPDATE_PROFILE,
    ProfileUser
  })

  export const sendDataUpdateProfile=(data)=>({
    type:SEND_DATA_UPDATE_PROFILE,
    data
  
  })

  export const dataProfileUsers =(idUser)=>({
    type: DATA_PROFILE_USERS,
    idUser
  })
  
  export const receiveDataProfile =(ProfileUser) =>({
    type:RECEIVE_DATA_PROFILE,
    ProfileUser
  })

  export const initializeState =()=>({
    type:INITITALIZE_STATE
  })