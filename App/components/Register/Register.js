import React, { Component } from 'react';
import { View , Text , ScrollView } from 'react-native';
import { Button,Icon } from 'react-native-elements';
import { Style }  from './styleRegister'
import {  Content, Form, Item, Input, } from 'native-base';
import axios from 'axios';

import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import { presetColors } from '../../data/dataCasual'
import AlertDialog from '../AlertDialog/AlertDialog';



class Register extends Component {
  
    state = { 
        login:"",
        email:"",
        password:"",
        confPWD:"",
        errorLoginCharacter:undefined,
        errorEmailCharacter:undefined,
        errorPwdCharacter:undefined,
        receiveResponseRegister:this.props.receiveResponseRegister,
        alertVisible:false,
        messageAlert:undefined,
        style:false
     };

   componentDidMount(){
  
 
   }
    
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

     sendInformation= ()=>{
        const { login , password,email,confPWD } = this.state;
        console.log("register data ",login , password,email,confPWD)
      if(confPWD === password ){
        this.setState({errorRegister:false})
        if(login.trim()=== "" || email.trim() ===""  || password.trim() ==="" || confPWD.trim() ===""){
            this.setState({
                alertVisible:true,
                messageAlert:"Veillez rempli tout les champs ",
                style:false
            })
        }else{
             axios.post('https://rabbin-dev.digitalcube.fr/api/users',{
                email:email,
                username:login,
                roles:["ROLE_USER"],
                password:password
            }).catch((err)=>{
                console.log(err)
                   
                   
                this.setState({
                    alertVisible:true,
                    messageAlert:"Erreur, Votre email à déja été enrigistré",
                    style:false
                })
                return;
            })
            this.setState({
                alertVisible:true,
                messageAlert:"Vous etes maintenant enregistré",
                style:true,
                login:"",
                email:"",
                password:"",
                confPWD:""
               })
        }
        
       
    }else{
        this.setState({errorRegister:true})
    }
     }
 

    goBack(){
        this.setState({receiveResponseRegister:false})
        this.props.navigation.goBack()
    }

    closeAlert=()=>{
        this.setState({alertVisible:false})
    }

    render() {
         

        return (
            <AnimatedLinearGradient  customColors={presetColors.backgroundColor} speed={4000}>
                <View style={ Style.textRegister}   >
                <Icon  underlayColor='none' onPress={()=>this.goBack()} size={30} name='keyboard-backspace'/> 
                </View>
            <View style={Style.container}>
            <ScrollView
                    
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="always"
                 >
                <Text style={{color:'white',fontWeight:'bold',fontSize:20,textAlign:"center"}}>Create My Account</Text>
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
                     <Icon  active name='lock'/> 
                         <Input 
                         style={Style.input} 
                         name="confPWD"
                         placeholderTextColor='white'
                         placeholder='Confirmation mot de passe *'
                         secureTextEntry={true}
                         maxLength={255}
                         value={this.state.confPWD}
                         onChange={this.collectDataForRegister}/>
                     </Item>

                    
                    </Form>
                    <AlertDialog 
                        alertVisible={this.state.alertVisible}
                        messageAlert={this.state.messageAlert}
                        closeAlert={this.closeAlert}
                        style={this.state.style}
                        />
                    {this.state.errorRegister && <Text style={{color:"red",marginTop:40,textAlign:'center'}}>Les mots de passe ne sont pas identiques</Text>}
                   
            </View>
        
            <Content>
            
                <Button 
                    containerStyle={Style.button}
                    buttonStyle={{borderRadius:30, backgroundColor:'rgba(41,113,232,0.8)'}}
                    onPress={this.sendInformation}
                    title='Valider'
                 
                />
              
             
            </Content>
            </ScrollView>
        </View>
        </AnimatedLinearGradient>
        );
    }
}

export default Register;