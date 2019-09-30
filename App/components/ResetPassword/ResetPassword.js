import React, { Component, Fragment } from 'react'
import { Text, View ,TouchableOpacity} from 'react-native'
import { Content, Item, Input } from 'native-base';
import { Button } from 'react-native-elements';

import { Style } from './styleResetPassword'

export class ResetPassword extends Component {
    state={
        email:undefined,
        messageErrorForReset:undefined
    }

    
    sendInformationForReset= async()=>{

        const { email } = this.state;

        await this.props.sendDataForReset( email );
        const validateForReset = await this.props.receiveResponseForReset
     
        if (validateForReset){
            this.setState({
                email:undefined,
            })
            this.setState({messageErrorForReset:false})
            this.props.navigation.navigate('Connection')
        }else{
            this.setState({messageErrorForReset:true})
        }
    }

    goToRegister=()=>{
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <View style ={ Style.container}>
           
              
            { this.state.messageErrorForReset && 
                  (<Text style={{color:'red',marginBottom: 20}}>Mot de passe ou Idientifiant incorrect</Text>)
            }
            <Fragment>
                <Text style={{marginBottom: 20}}>Entrer votre email pour renitialiser votre mot de passe</Text>
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
            </Fragment> 
                 <Content>
        
                 <Button rounded info 
                     containerStyle={Style.button}
                     onPress= {this.sendInformationForReset}
                     title= 'envoyer'
                 />
                    
                 <View 
                     style={ Style.textRegister}
                 >
                     <TouchableOpacity
                     onPress={this.goToRegister}
                     >
                         <Text style={{ color:'blue'}}
                         > 
                             Vous n'avez pas de compte ? inscrivez-vous  
                         </Text>
                    
                     </TouchableOpacity>
                     
                 </View>
             </Content>
             </View>
)
    }
}

export default ResetPassword
