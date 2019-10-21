import {SEND_DATA_CONNECTION, RESPONSE_CONNECTION} from '../reducer'

export const sendDataConnection = (login,password) => ({
    type: SEND_DATA_CONNECTION,
    login,
    password
  });

  
export const responseConnection = (responseConnection) => ({
    type: RESPONSE_CONNECTION,
    responseConnection,
  
  });

 