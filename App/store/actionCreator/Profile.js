import {RECEIVE_DATA_UPDATE_PROFILE,SEND_DATA_UPDATE_PROFILE} from '../reducer'

export const receiveDataUpdateProfile=(ProfileUser)=>({
    type:RECEIVE_DATA_UPDATE_PROFILE,
    ProfileUser
  })

  export const sendDataUpdateProfile=(login , email , password , confPwd)=>({
    type:SEND_DATA_UPDATE_PROFILE,
    login,
    email,
    password,
    confPwd
  
  })
  