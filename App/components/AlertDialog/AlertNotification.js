import React, { Component, Fragment } from 'react'
import { View, Text, Platform , Picker} from 'react-native'
import { Input } from 'native-base';
import Dialog from "react-native-dialog";
import { Style } from './styleAlertDialog';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";

class AlertNotification extends Component{

        state={
            currentCategory:undefined,
            idCategory:undefined,
            category:undefined
        }

    componentDidMount(){
        const { dataAllCategory , receiveResponseConnection} =this.props
        dataAllCategory(receiveResponseConnection)

    }
    static getDerivedStateFromProps(props,state){ 
        const {dataStateAllCategory } = props
        if(dataStateAllCategory){
            state.category=dataStateAllCategory
        }
    }

  render(){

      const {closeAlert,
        alertVisible,
        messageAlert,
         yesConfirm ,
         confirmValid,
         validConfirm } = this.props
    const { 
        currentCategory,
        category,
        idCategory
       
    } = this.state
    console.log("TCL: AlertNotification -> render -> category", idCategory)
        return (
      
         
            <Dialog.Container 
            visible={alertVisible}
            headerStyle={{borderRadius:30 }}
            contentStyle={{width:wp("90%"),borderRadius:14,justifyContent:"space-between",marginBottom:Platform.OS==='ios'?30:0}}
            buttonSeparatorStyle={{color:"black"}} >
            { confirmValid ?

                <Fragment>
                <Dialog.Description style={[Style.register,{color:"black"}] } >
                        <Text style={{fontWeight:"bold"}}>Choisissez une catégorie </Text>
                </Dialog.Description> 
                <Dialog.Description style={[Style.register,{color:"black",}] }>
                    
                    <Picker
                
                    selectedValue={currentCategory}
                    style={Style.picker}
                    onValueChange={(itemValue, itemIndex) =>{
                        console.log("TCL: AlertNotification -> render -> itemIndex", itemValue)
                        this.setState({
                            currentCategory: itemValue,
                            idCategory:itemValue
                            
                        })}
                    }
                    
                    >
                        {category && category.map((value,key)=>{
                            
                            return(
                                <Picker.Item  key={key} label={value.title} value={value.id} />
                            )
                        })}
                        


                    </Picker>

                </Dialog.Description>
                </Fragment>
               :    
                 <Dialog.Description style={[Style.register,{color:"black", marginBottom:10}] } >
                    { messageAlert ? messageAlert:" "  }
                </Dialog.Description> }
         
              
              <View style={Platform.OS === "ios" ? Style.containerButtonIos :Style.containerButtonAndroid}>
                  <Dialog.Button 
                  bold={true} 
                  style={Platform.OS === "ios"? Style.buttonIos:[Style.buttonAndroid,{backgroundColor:"#0B6ACA"}]} 
                  color="white"
                  label= {confirmValid ?"Valider":"Oui"}
                  onPress={()=> confirmValid ? validConfirm(idCategory):yesConfirm(idCategory)} />
                
                  <Dialog.Button 
                  bold={true}  
                  color="white"
                  style={Platform.OS === "ios"? Style.buttonIos:[Style.buttonAndroid,{backgroundColor:"grey"}]} 
                  label="Annuler" 
                  onPress={()=>closeAlert()} />
              </View>
              
              
               
        
            </Dialog.Container>
        
        )
    }
}
 

export default AlertNotification