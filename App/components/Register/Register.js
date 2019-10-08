import React, { Component } from 'react';
import { View , Text , TouchableOpacity,TouchableHighlight } from 'react-native';
import { Button,Icon } from 'react-native-elements';
import { Style }  from './styleRegister'
import {  Content, Form, Item, Input, } from 'native-base';

import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import { presetColors } from '../../data/dataCasual'
class Register extends Component {
  
    state = { 
        login:undefined,
        email:undefined,
        password:undefined,
        confPWD:undefined,
        errorLoginCharacter:undefined,
        errorEmailCharacter:undefined,
        errorPwdCharacter:undefined
     };
    
     collectDataForRegister =(evt)=>{
        const { name }  = evt._targetInst.pendingProps;

        const { text } = evt.nativeEvent;

        switch(name){
            case 'login':
                    if(text.length < 3 && text.trim() !== ''){
                        this.setState({errorLoginCharacter:true})
                    }else{
                        this.setState({errorLoginCharacter:false})
                    }
                break;
            case 'email':
                    if(text.length < 3 && text.trim() !== ''){
                        this.setState({errorEmailCharacter:true})
                    }else{
                        this.setState({errorEmailCharacter:false})
                    }
                break;
            case 'password':
                    if(text.length  < 4 && text.trim() !== ''){
                        this.setState({errorPwdCharacter:true})
                    }else{
                        this.setState({errorPwdCharacter:false})
                    }
                break;
                
        }
       
        this.setState({[name]:text})
     }

     sendInformation= async ()=>{
        const { login , password } = this.state;
      
        await this.props.sendDataRegister( login , email , password ,confPWD )
        const validateRegister = await this.props.receiveResponseRegister
        if (validateRegister){
            this.setState({
                login:undefined,
                email:undefined,
                password:undefined,
                confPWD:undefined,
            })
            // this.props.navigation.goBack()
        }
          
    
    }

    render() {
  
        return (
            <AnimatedLinearGradient  customColors={presetColors.instagram} speed={4000}>
            <View style={Style.container}>
                <Text style={{color:'white',fontWeight:'bold',fontSize:20}}>Create My Account</Text>
            <View style={Style.form}>
     
       
                    <Form >
                   
                        <Item last  style={Style.containerInput}>
                        <Icon active name='person'/>
                            <Input 
                             style={Style.input} 
                             placeholderTextColor='white'
                             name="login"
                             placeholder='identifiant *'
                             maxLength={255}
                             value={this.state.login}
                             onChange={this.collectDataForRegister}
                             />
                          
                        </Item>
                        { this.state.errorLoginCharacter && (<Text style={{color:'red'}}>Il faut au moins 3 caractères</Text>)}
                        

                      
                        <Item last  style={Style.containerInput}>
                        <Icon active name='mail'/>
                            <Input 
                            placeholderTextColor='white'
                            style={Style.input} 
                            placeholder='E-mail *'
                            name="email"
                            maxLength={255}
                            value={this.state.email}
                            onChange={this.collectDataForRegister}/>
                        </Item>

                        { this.state.errorEmailCharacter && (<Text style={{color:'red'}}>Il faut au moins 4 caractères</Text>)}

                       
                        <Item last  style={Style.containerInput}>
                        <Icon active name='lock'/>
                         <Input 
                         style={Style.input}
                         name="password"
                         placeholderTextColor='white'
                         placeholder='Mot de passe *'
                         secureTextEntry={true}
                         maxLength={255}
                         value={this.state.password}
                         onChange={this.collectDataForRegister}/>
                     </Item>
                     {this.state.errorPwdCharacter && (<Text style={{color:'red'}}>Il faut au moins 4 caractères</Text>)}
                    

                   
                    
                     <Item last  style={Style.containerInput}>
                         
                         <Input 
                         style={Style.input} 
                         name="confPWD"
                         placeholderTextColor='white'
                         placeholder='Confirmation du mot de passe *'
                         secureTextEntry={true}
                         maxLength={255}
                         value={this.state.confPWD}
                         onChange={this.collectDataForRegister}/>
                     </Item>

                    
                    </Form>

            </View>
        
            <Content>
            
                <Button 
                    containerStyle={Style.button}
                    buttonStyle={{borderRadius:30, backgroundColor:'rgba(41,113,232,0.8)'}}
                    onPress={this.sendInformation}
                    title='Valider'
                 
                />
              
                <View 
                    style={ Style.textRegister}
                >
                     <Text 
                     style={{fontSize:18}} 
                     onPress={()=>this.props.navigation.goBack()}
                     >
                           retour </Text>
                </View>
            </Content>
         
        </View>
        </AnimatedLinearGradient>
        );
    }
}

export default Register;