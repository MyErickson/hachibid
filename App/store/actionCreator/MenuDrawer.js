import {RECEIVE_TOP_DATA_CATEGORY,TOP_DATA_CATEGORY} from '../reducer'

export const receiveTopDataCategory=()=>({
    type:RECEIVE_TOP_DATA_CATEGORY,
 
  })

export const topDataCategory=(topDataCategory )=>({
    type:TOP_DATA_CATEGORY,
    topDataCategory
  })
  