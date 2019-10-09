import {SEND_DATA_RESET_PASSWORD,RESPONSE_FOR_RESET} from '../reducer'


export const sendDataResetPassword= (email) =>({
    type: SEND_DATA_RESET_PASSWORD,
    email,
   
  })
  
  
  
  
  export const responseForReset= (responseReset) => ({
    type: RESPONSE_FOR_RESET,
    responseReset,
  
  });
  