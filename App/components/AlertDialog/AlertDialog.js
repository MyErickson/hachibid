import React from 'react'
import { View, Text } from 'react-native'
import Dialog from "react-native-dialog";
import { Style } from './styleAlertDialog';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

const AlertDialog = ({closeAlert,alertVisible,messageAlert,style,alertConfirm =false,logOutOrRegister,yesConfirm}) => {



    return (
  
        <View >
        <Dialog.Container visible={alertVisible} headerStyle={{height:hp("8%") }} contentStyle={{width:wp("90%")}} >
          <Dialog.Description style={style? Style.succesRegister :Style.errorRegister }>
            {messageAlert ?messageAlert:" " }
          </Dialog.Description>
          { alertConfirm ? 
          (<View style={{flexDirection:"row",justifyContent:"flex-end",marginTop:15,marginBottom:15}}>
              <Dialog.Button bold={true} style={{fontSize:15,margin:10}} label="Oui" onPress={()=> yesConfirm(logOutOrRegister)} />
              <Dialog.Button bold={true}  style={{fontSize:15,margin:10}} label="Annuler" onPress={closeAlert} />
          </View>)
          :
          <Dialog.Button label="ok,j'ai compris" onPress={closeAlert} />
          }
         
        </Dialog.Container>
      </View>
    )
}

export default AlertDialog