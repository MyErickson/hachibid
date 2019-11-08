import React from 'react'
import { View, Text } from 'react-native'
import Dialog from "react-native-dialog";
import { Style } from './styleAlertDialog';


const AlertDialog = ({closeAlert,alertVisible,messageAlert,style,alertConfirm = false,yesConfirm}) => {



    return (
  
        <View>
        <Dialog.Container visible={alertVisible}>
          <Dialog.Description style={style? Style.succesRegister :Style.errorRegister }>
            {messageAlert ?messageAlert:" " }
          </Dialog.Description>
          { alertConfirm ? 
          (<View style={{flexDirection:"row",justifyContent:"flex-end"}}>
              <Dialog.Button label="Oui" onPress={alertConfirm ? yesConfirm :()=>{} } />
              <Dialog.Button label="Annuler" onPress={closeAlert} />
          </View>)
          :
          <Dialog.Button label="ok,j'ai compris" onPress={closeAlert} />
          }
         
        </Dialog.Container>
      </View>
    )
}

export default AlertDialog