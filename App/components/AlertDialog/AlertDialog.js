import React from 'react'
import { View, Text, Platform} from 'react-native'
import Dialog from "react-native-dialog";
import { Style } from './styleAlertDialog';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const AlertDialog = ({closeAlert,alertVisible,messageAlert,style,logOutOrRegister,yesConfirm,alertConfirm =false,noTextClose=true}) => {



    return (
  
     
        <Dialog.Container 
        visible={alertVisible}
        headerStyle={{height:hp("7%"),borderRadius:30 }}
        contentStyle={{width:wp("90%"),borderRadius:14}}
        buttonSeparatorStyle={{color:"black"}} >
          <Dialog.Description style={style? Style.succesRegister :Style.errorRegister }>
            {messageAlert ?messageAlert:" " }
          </Dialog.Description>
          { alertConfirm ? 
          (<View style={Platform.OS === "ios" ? Style.containerButtonIos :Style.containerButtonAndroid}>
           
              <Dialog.Button 
              bold={true} 
              style={Platform.OS === "ios"? Style.buttonIos:Style.buttonAndroidYes} 
              color="white"
              label="Oui" 
              onPress={()=> yesConfirm(logOutOrRegister)} />
         
              <Dialog.Button 
              bold={true}  
              color="white"
              style={Platform.OS === "ios"? Style.buttonIos:Style.buttonAndroidNo} 
              label="Annuler" 
              onPress={closeAlert} />
          </View>)
          :
          noTextClose ?<Dialog.Button label="ok,j'ai compris" onPress={closeAlert}/> : <Dialog.Button label=""/> 
          }
         
        </Dialog.Container>
     
    )
}

export default AlertDialog