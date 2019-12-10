import React, { Component } from 'react';
import { View , Text , ScrollView,SafeAreaView} from 'react-native';
import { Button,Icon } from 'react-native-elements';
import { Style }  from './styleRegister'
import {  Content, Form, Item, Input, } from 'native-base';
import axios from 'axios';

import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import { presetColors } from '../../store/actionRequetes/actionRequetes'
import AlertDialog from '../AlertDialog/AlertDialog';



class Register extends Component {
  
    constructor(props){
        super(props)
        this.state = { 
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
         this.input = { }
    }

    
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
                password:password,
                resetToken:null
            }).catch((err)=>{
                console.log(err.response)
                   
                   
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
 
    inputFocus=(id)=>{
        this.input[id]._root.focus()
    }


    goBack(){
        this.setState({receiveResponseRegister:false})
        this.props.navigation.goBack()
    }

    closeAlert=()=>{
        const { messageAlert } =this.state
        if(messageAlert === "Vous etes maintenant enregistré"){
            this.setState({alertVisible:false})
            this.props.navigation.navigate("Connection")
        }else{
            this.setState({alertVisible:false})
        }
      
        
    }

    render() {
         

        return (
            <AnimatedLinearGradient  customColors={presetColors.backgroundColor} speed={4000}>
                    <SafeAreaView style={{flex:1}} >
                <View style={ Style.textRegister}   >
                <Icon underlayColor="none" onPress={()=>this.goBack()} size={30} name='keyboard-backspace'/> 
                </View>
            <View style={Style.container}>
       
            <ScrollView
                    keyboardDismissMode='on-drag'
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                    contentInsetAdjustmentBehavior="automatic"
                    
                 >
                <Text style={{color:'white',fontWeight:'bold',fontSize:20,textAlign:"center"}}>Create My Account</Text>
            <View style={Style.form}>
     
       
                    <Form 
                    
                    >
                   
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
                             onSubmitEditing={() => { this.inputFocus("email") }}
                             blurOnSubmit={false}
                             returnKeyType="next"
                            
                             />
                          
                        </Item>
                        { this.state.errorLoginCharacter && (<Text style={{color:'red'}}>Il faut au moins 3 caractères</Text>)}
                        

                      
                        <Item last  style={Style.containerInput}>
                        <Icon active name='mail'/>
                            <Input 
                            
                            ref={ text => this.input['email'] = text}
                            placeholderTextColor='white'
                            style={Style.input} 
                            placeholder='E-mail *'
                            name="email"
                            maxLength={255}
                            value={this.state.email}
                            onChange={this.collectDataForRegister}
                            onSubmitEditing={() => { this.inputFocus("password") }}
                            returnKeyType="next"
                            />
                       
                        </Item>

                        { this.state.errorEmailCharacter && (<Text style={{color:'red'}}>Il faut au moins 4 caractères</Text>)}

                       
                        <Item last  style={Style.containerInput}>
                        <Icon active name='lock'/>
                         <Input 
                         ref={ text => this.input['password'] = text}
                         style={Style.input}
                         name="password"
                         placeholderTextColor='white'
                         placeholder='Mot de passe *'
                         secureTextEntry={true}
                         maxLength={255}
                         value={this.state.password}
                         onChange={this.collectDataForRegister}
                         onSubmitEditing={() => { this.inputFocus("confPWD") }}
                         returnKeyType="next"
                         />
               
                     </Item>
                     {this.state.errorPwdCharacter && (<Text style={{color:'red'}}>Il faut au moins 4 caractères</Text>)}
                    

                   
                    
                     <Item last  style={Style.containerInput}>
                     <Icon  active name='lock'/> 
                         <Input 
                         ref={ text => this.input['confPWD'] = text}
                         style={Style.input} 
                         name="confPWD"
                         placeholderTextColor='white'
                         placeholder='Confirmation mot de passe *'
                         secureTextEntry={true}
                         maxLength={255}
                         value={this.state.confPWD}
                         onChange={this.collectDataForRegister}
                         onSubmitEditing={this.sendInformation}
                         returnKeyType="send"
                         />
                
                     </Item>
                     <View   style={{marginTop:40}}>
                     {this.state.errorRegister && <Text style={{color:"red",marginBottom:10,textAlign:'center'}}>Les mots de passe ne sont pas identiques</Text>}
                        <Button 
                     
                        containerStyle={Style.button}
                        buttonStyle={{borderRadius:30, backgroundColor:'rgba(41,113,232,0.8)'}}
                        onPress={this.sendInformation}
                        title='Valider'/>
                   </View> 
                    </Form>
                    <AlertDialog 
                        alertVisible={this.state.alertVisible}
                        messageAlert={this.state.messageAlert}
                        closeAlert={this.closeAlert}
                        style={this.state.style}
                        />
                    
          
            </View>

            
           
              

            </ScrollView>
    
        </View>
        </SafeAreaView>
        </AnimatedLinearGradient>
        );
    }
}

export default Register;