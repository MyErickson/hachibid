/**
 * Initial State
 */
const initialState = {
  receiveResponseConnection: undefined,
  receiveResponseRegister:undefined,
  receiveResponseForReset:undefined,
  dataMessages:undefined,
  
};

/**
 * Types
 */
export const SEND_DATA_CONNECTION = 'SEND_DATA_CONNECTION';
export const RESPONSE_CONNECTION = 'REPONSE_CONNECTION';
export const SEND_DATA_REGISTER ='SEND_DATA_REGISTER';
export const RESPONSE_REGISTER = 'REPONSE_REGISTER';
export const SEND_DATA_RESET_PASSWORD = 'SEND_DATA_RESET_PASSWORD';
export const RESPONSE_FOR_RESET = ' RESPONSE_FOR_RESET';
export const SEND_MESSAGE_USER= 'SEND_MESSAGE_USER';
export const RECEIVE_DATA_MESSAGE='RECEIVE_DATA_MESSAGE';
/**
 * Traitements
 */

/**
 * Reducer
 */
const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case RESPONSE_CONNECTION:
      return {
        ...state,
        receiveResponseConnection:action.responseConnection
      };
    case RESPONSE_REGISTER:
      return {
        ...state,
        receiveResponseRegister:action.esponseRegister
      };
    case RESPONSE_FOR_RESET:
      return {
        ...state,
        receiveResponseForReset:action.responseReset
      };
    case RECEIVE_DATA_MESSAGE:
          return {
            ...state,
            dataMessages:action.allMessage
          };
    default:
      return state;
  }
};

/**
 * Action Creators
 */
export const sendDataConnection = (login,password) => ({
  type: SEND_DATA_CONNECTION,
  login,
  password
});

export const sendDataRegister = (login , email , password , confPWD) =>({
  type: SEND_DATA_REGISTER,
  login,
  email,
  password,
  confPWD
})

export const sendDataResetPassword= (email) =>({
  type: SEND_DATA_RESET_PASSWORD,
  email,
 
})

export const sendMessageUser =( message ) =>({
  type: SEND_MESSAGE_USER,
  message
})


export const responseConnection = (responseConnection) => ({
  type: RESPONSE_CONNECTION,
  responseConnection,

});

export const responseRegister = (responseRegister) => ({
  type: RESPONSE_REGISTER,
  responseRegister,

});

export const responseForReset= (responseReset) => ({
  type: RESPONSE_FOR_RESET,
  responseReset,

});

export const receiveDataMessages=(allMessage)=>({
  type:RECEIVE_DATA_MESSAGE,
  allMessage
})

/**
 * Selectors
 */

/**
 * Export
 */
export default reducer;

