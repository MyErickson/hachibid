import React, { Component, Fragment } from 'react';
import { View , Text , TouchableOpacity, Animated} from 'react-native';
import { Button } from 'react-native-elements';
import { Style }  from './styleConnection'
import {  Content, Form, Item, Input } from 'native-base';
import ResetPassword from "../ResetPassword/ResetPassword"
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import { presetColors } from '../../data/dataCasual'
import Wave from 'react-native-waveview'
import AsyncStorage from '@react-native-community/async-storage';

import axios from 'axios';
import AlertDialog from '../AlertDialog/AlertDialog';





class Connection extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            login:undefined,
            password:undefined,
            connection:undefined,
            showResetPassword:false,
            isModalVisible:false,
            alertVisible:false,
            style:false
         };
         this.position = new Animated.Value(0)
    }
    componentDidMount(){
        Animated.timing(this.position, {
            toValue: 100,
            duration: 2000,
          }).start();
        
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible });
      };

    collectLoginAndPwd=(evt)=>{

        const { name }  = evt._targetInst.pendingProps;
        const { text } = evt.nativeEvent;
        this.setState({[name]:text})
    }

    sendInformation= async ()=>{
        
        const { login , password } = this.state;
           console.log(login,password)
           await  axios.post('https://rabbin-dev.digitalcube.fr/api/login_check',{
             
                username:login,
                password:password,
              
            }).then((response)=>{
            
                this.setState({
                    login:undefined,
                    password:undefined,
                    alertVisible:false,
                    connection:response.data.token
                })
                this.props.responseConnection(response.data.token) 
                this.props.navigation.navigate("Home")
            })
            .catch((err)=>{
             console.log("eroor connexion",err)
                this.setState({
                    alertVisible:true,
                    style:false,
                    messageAlert:'Mot de passe ou Idientifiant incorrect'
                })
      
            })
           
    }
  
    goToRegister=()=>{
        this.props.navigation.navigate('Register')
    }

    goToresetPassword=()=>{
        this.setState({modal:true})
    }

   closeAlert=()=>{
       this.setState({alertVisible:!this.state.alertVisible})
   }


    render() {
        const { login , password,messageAlert,style } = this.state;
       this.state.connection && this.props.receiveResponseConnection && this.props.navigation.navigate("Home")
      
        return (
            <Fragment>
                <AnimatedLinearGradient  customColors={presetColors.backgroundColor} speed={4000}>
            <View style={Style.container}>
            <Text style={Style.textConnexion}>
                Connexion</Text>
              
                <AlertDialog
                alertVisible={this.state.alertVisible}
                closeAlert={this.closeAlert}
                messageAlert={messageAlert}
                style={style}
                />

                <Content>
                <View style={Style.form}>
              
                        <Form >
                            <Item last  regular style={Style.containerInput}>
                         
                                <Input 
                               
                                 placeholder="Identitfiant *" 
                                 name="login"
                                 maxLength={255}
                                 value={login}
                                 onChange={this.collectLoginAndPwd}
                                 />
                              
                            </Item>
                            <Item last regular style={Style.containerInput}>
                             
                                <Input 
                             
                                placeholder="Mot de passe *" 
                                secureTextEntry={true}
                                name="password"
                                maxLength={255}
                                value={password}
                                onChange={this.collectLoginAndPwd}/>
                            </Item>
                            
                            <Button rounded info 
                        containerStyle={Style.button}
                        buttonStyle={{borderRadius:20,height:45,backgroundColor:'rgba(41,113,232,0.8)'}}
                        onPress= {this.sendInformation}
                        title= 'se connecter'
                     
                    />
                    
                        </Form>

                </View> 
                <View style={{alignItems:"flex-end",marginTop:15}}>
                            <TouchableOpacity
                            onPress={this.toggleModal}
                            >
                            <Text>Mot de passe oublié ?</Text>
                            </TouchableOpacity>
                        </View>            
            </Content>

            <ResetPassword 
            toggleModal={this.toggleModal} 
            isModalVisible={this.state.isModalVisible}/>
           
            </View>
            </AnimatedLinearGradient>
            <View style={Style.waveContainer} >
                    <Wave
                        style={Style.wave}
                        H={25}
                        waveParams={[
                            {A: 35, T:500, fill: '#ffffff'},
                            
                           
                        ]}
                        animated={true}
                    />
           
                  
            </View >
                    <View  style={ Style.textRegister}>
                         <Text> 
                            Vous n'avez pas de compte ?
                        </Text>
                        <TouchableOpacity
                        onPress={this.goToRegister}
                        >
                           
                            <Text style={{ 
                            color:'blue',
                             fontSize:15,
                             marginLeft:5,
                             fontWeight:'bold',
                            zIndex:1}}> 
                                 inscrivez-vous  
                            </Text>
                       
                        </TouchableOpacity>
                        
                    </View>
        </Fragment>
        );
    }
}

export default Connection;