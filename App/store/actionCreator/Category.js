import { SEND_DATA_FILTER_CATEGORY, RECEIVE_DATA_ALL_CATEGORY,DATA_ALL_CATEGORY,RECEIVE_DATA_FILTER_CATEGORY } from "../reducer";


export const sendDataFilterCategory=(text)=>({
    type:SEND_DATA_FILTER_CATEGORY,
    text
})

export const receiveDataFilterCategory=(dataFilterCategory)=>({
    type:RECEIVE_DATA_FILTER_CATEGORY,
    dataFilterCategory

})

export const DataAllCategory=(category)=>({
    type:DATA_ALL_CATEGORY,
    category
})

export const receiveDataAllCategory=(dataAllCategory)=>({
    type:RECEIVE_DATA_ALL_CATEGORY,
    dataAllCategory
})
