import React, { Component, Fragment } from 'react'
import { Text, View ,Dimensions , Platform} from 'react-native'
import { Content, Item, Input, Container } from 'native-base';
import { Button, Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import { Style } from './styleResetPassword'
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';


export class ResetPassword extends Component {
    state={
        email:undefined,
        messageErrorForReset:undefined,
        modalVisible: this.props.isModalVisible,
        showValidate:undefined,
        message:undefined
    }

    
    sendInformationForReset= async()=>{

        const { email } = this.state;

        console.log("mon email est ",email)
        if(email){
            await axios.post('https://rabbin-dev.digitalcube.fr/forgot-password',{
                email:email
           }).then((response)=>{
          
               console.log('dans le component reset pour la reponse',response)
               this.setState({
                   email:undefined,
               })
               this.setState({messageErrorForReset:false , showValidate:true })
           }).catch((err)=>{
   
                console.log('error dans le component reset ',err.response)
                this.setState({messageErrorForReset:true, showValidate:false,message:err.response.data.message})
           })
        }else{
            this.setState({messageErrorForReset:true, showValidate:false,message:"Le champ est vide"})
        }
      
     }
    
     collectLoginAndPwd=(text)=>{
         console.log(text)
         this.setState({email:text})
     }

     closeModal =()=>{
       
    
        this.props.toggleModal()
        this.setState({showValidate:false, messageErrorForReset:false })
    }

    render() {

       
        const { messageErrorForReset , showValidate,message } = this.state;
          
        return (
            <Modal style={{height:10}} 
             isVisible={this.props.isModalVisible}
             backdropTransitionOutTiming={0}
             >
 
               <Container  style={ Style.container}>
             <Content>
            { messageErrorForReset ? 
                  (<Text style={{color:'red',marginBottom: 20,margin: 10}}>{message}</Text>)
                  :
            
                <Text style={{margin: 10,fontSize:16}}>Entrer votre email pour renitialiser votre mot de passe</Text>
            }
            {showValidate ? 
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Icon name='done' color='green' size={40} />
                    <Text style={{marginTop:15, fontSize:20,color:'green'}}>Un mail vous a été envoyé</Text>
                </View>
            :
          <View style={{width:300}}>
          <Item last regular style={Style.containerInput}>
                  
              <Input 
              placeholder="email *" 
              name="email"
              maxLength={255}
              value={this.state.email}
              onChangeText={this.collectLoginAndPwd}/>


          </Item>  


      </View>
        }
             
            <View style={Style.containerButton}>
              
                    <Button rounded 
                     containerStyle={Style.button}
                     buttonStyle={{borderRadius:30,backgroundColor:'#e5e6e8'}}
                     onPress= {()=>this.closeModal()}
                     title= 'Fermer'
                 />
                   <Button rounded 
                     containerStyle={Style.button}
                     buttonStyle={{borderRadius:30}}
                     onPress= {this.sendInformationForReset}
                     title= 'Envoyer'
                     
                 />
                </View>
               </Content>
               </Container> 

             </Modal>
          
)
    }
}

export default ResetPassword
