import React from 'react'
import { View, Text } from 'react-native'
import Dialog from "react-native-dialog";
import { Style } from './styleAlertDialog';


const AlertDialog = ({closeAlert,alertVisible,messageAlert,style}) => {
 


    return (
  
        <View>
        <Dialog.Container visible={alertVisible}>
          <Dialog.Description style={style? Style.succesRegister :Style.errorRegister }>
            {messageAlert}
          </Dialog.Description>
          <Dialog.Button label="ok,j'ai compris" onPress={closeAlert} />
        </Dialog.Container>
      </View>
    )
}

export default AlertDialog