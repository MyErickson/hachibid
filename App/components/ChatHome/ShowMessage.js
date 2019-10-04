import React, { Fragment } from 'react';
import { Text, View } from 'react-native';

function ShowMessage({allMessage,show}){
  
  
    if(allMessage !== undefined ){
      
       var showAllMessage = allMessage.map((value, key)=>{
          
           return (
                  <Text key={key} style={{color: 'black',padding:20  , transform: [{ scaleY: 1 }]}}>{value.message}</Text>
           )
       }) 

    }

 
    return (
    <Fragment>
         {showAllMessage} 
    </Fragment>
    )

}
export default ShowMessage
