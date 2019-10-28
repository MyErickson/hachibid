import {RECEIVE_TOP_DATA_CATEGORY,TOP_DATA_CATEGORY} from '../reducer'

export const receiveTopDataCategory=(token)=>({
    type:RECEIVE_TOP_DATA_CATEGORY,
    token
  })

export const topDataCategory=(topDataCategory )=>({
    type:TOP_DATA_CATEGORY,
    topDataCategory
  })
  