/**
 * Initial State
 */
const initialState = {
  receiveResponseConnection: undefined,
  receiveResponseRegister:undefined,
  receiveResponseForReset:undefined,
};

/**
 * Types
 */
export const SEND_DATA_CONNECTION = 'SEND_DATA_CONNECTION';
export const RESPONSE_CONNECTION = 'REPONSE_CONNECTION';
export const SEND_DATA_REGISTER ='SEND_DATA_REGISTER';
export const RESPONSE_REGISTER = 'REPONSE_REGISTER';
export const SEND_DATA_RESET_PASSWORD = 'SEND_DATA_RESET_PASSWORD';
export const  RESPONSE_FOR_RESET = ' RESPONSE_FOR_RESET';
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
        receiveResponseConnection:action.response
      };
    case RESPONSE_REGISTER:
      return {
        ...state,
        receiveResponseRegister:action.response
      };
    case RESPONSE_FOR_RESET:
      return {
        ...state,
        receiveResponseForReset:action.response
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

export const responseConnection = (response) => ({
  type: RESPONSE_CONNECTION,
  response,

});

export const responseRegister = (response) => ({
  type: RESPONSE_REGISTER,
  response,

});

export const responseForReset= (response) => ({
  type: RESPONSE_FOR_RESET,
  response,

});

/**
 * Selectors
 */

/**
 * Export
 */
export default reducer;

