import {RESPONSE_REGISTER,SEND_DATA_REGISTER} from '../reducer'

export const responseRegister = (responseRegister) => ({
    type: RESPONSE_REGISTER,
    responseRegister,
  
  });
  export const sendDataRegister = (login , email , password , confPWD) =>({
    type: SEND_DATA_REGISTER,
    login,
    email,
    password,
    confPWD
  })