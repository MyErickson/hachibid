import React, { Component, Fragment } from 'react'
import { Text, View ,Dimensions , Platform} from 'react-native'
import { Content, Item, Input, Container } from 'native-base';
import { Button, Icon } from 'react-native-elements';
import Modal from "react-native-modal";
import { Style } from './styleResetPassword'
import LinearGradient from 'react-native-linear-gradient';
export class ResetPassword extends Component {
    state={
        email:undefined,
        messageErrorForReset:undefined,
        modalVisible: this.props.isModalVisible,
        showValidate:undefined
    }

    
    sendInformationForReset= async()=>{

        const { email } = this.state;

        // await this.props.sendDataForReset( email );
        // const validateForReset = await this.props.receiveResponseForReset
     
        if (true){
            this.setState({
                email:undefined,
            })
            this.setState({messageErrorForReset:false , showValidate:true})
            this.props.navigation.navigate('Connection')
        }else{
            this.setState({messageErrorForReset:true, showValidate:true})
        }
    }

    goToRegister=()=>{
        this.props.navigation.navigate('Register')
    }

     closeModal =()=>{
       
        this.setState({showValidate:false})
        this.props.toggleModal()
    }

    render() {

       
        const { messageErrorForReset , showValidate } = this.state;
          
        return (
            <Modal style={{height:10}} 
             isVisible={this.props.isModalVisible}
             backdropTransitionOutTiming={0}
             >
 
               <Container  style={ Style.container}>
             <Content>
            { messageErrorForReset ? 
                  (<Text style={{color:'red',marginBottom: 20,margin: 10}}>Nous avons pas trouvé votre mail</Text>)
                  :
            
                <Text style={{margin: 10,fontSize:16}}>Entrer votre email pour renitialiser votre mot de passe</Text>
            }
            {showValidate ? 
                <View style={{flexDirection:'row',justifyContent:'center'}}>
                    <Icon name='done' color='green' size={60} />
                    <Text style={{marginTop:15, fontSize:30,color:'green'}}>Modifié</Text>
                </View>
            :
          <View style={{width:300}}>
          <Item last regular style={Style.containerInput}>
                  
              <Input 
              style={Style.input} 
              placeholder="email *" 
              name="email"
              maxLength={255}
              value={this.state.email}
              onChange={this.collectLoginAndPwd}/>


          </Item>  


      </View>
        }
             
            <View style={Style.containerButton}>
              
                    <Button rounded 
                     containerStyle={Style.button}
                     buttonStyle={{borderRadius:30,backgroundColor:'#e5e6e8'}}
                     onPress= {()=>this.closeModal()}
                     title= 'Annuler'
                 />
                   <Button rounded 
                     containerStyle={Style.button}
                     buttonStyle={{borderRadius:30}}
                     onPress= {this.sendInformationForReset}
                     title= 'Envoyer'
                     ViewComponent={LinearGradient}
                     linearGradientProps={{
                        colors: [ 'rgb(14, 65, 144)','rgb(160, 190, 235)'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                      }}
                 />
                </View>
               </Content>
               </Container> 

             </Modal>
          
)
    }
}

export default ResetPassword
