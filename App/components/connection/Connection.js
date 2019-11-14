import React, { Component, Fragment } from 'react';
import { View , Text , TouchableOpacity, Animated,ScrollView} from 'react-native';
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
import { underline } from 'ansi-colors';

var jwtDecode = require('jwt-decode');




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
    async   componentDidMount (){
        AsyncStorage.removeItem('sessionJWT')

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
      
           await  axios.post('https://rabbin-dev.digitalcube.fr/api/login_check',{
             
                username:login,
                password:password,
              
            }).then(async(response)=>{
                let data = new Object 
                this.setState({
                    login:undefined,
                    password:undefined,
                    alertVisible:false,
                    connection:response.data.token
                })
                await this.props.responseConnection(response.data.token) 
             
                var decode = jwtDecode(response.data.token)

                console.log("je sui dns connection ", decode.roles[0])
                data.id =decode.id 
                data.token = this.props.receiveResponseConnection
                await this.props.dataProfileUsers( data )


                if(decode.roles[0]=== "ROLE_ADMIN"){
                    this.props.navigation.navigate("MyQuestions")
                }else {
                    this.props.navigation.navigate("Home")
                }
              
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
        
        const storageConnection = AsyncStorage.getItem('sessionJWT')

        const { login , password,messageAlert,style } = this.state;
       
       this.state.connection && storageConnection && this.props.navigation.navigate("Home")
      
        return (
            <View
            style={{flex:1}}
            >
               <ScrollView
                 
                   showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="always"
                  style={{flex:1}}
                 >
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
                <ScrollView
                     keyboardShouldPersistTaps="always"
                     showsVerticalScrollIndicator={false}
                     style={{flex:1}}
                 >
                        <Form >
                            <Item last  regular style={Style.containerInput}>
                         
                                <Input 
                               
                                 placeholder="Mail *" 
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
                        </ScrollView>
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
                            {A:45, T:700, fill: '#ffffff'},
                            
                           
                        ]}
                        animated={true}
                    />

                  
            </View >
                    <View  style={ Style.textRegister}>
                        <View style={ { flexDirection:"row",}}>
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
                             }}> 
                                 inscrivez-vous  
                            </Text>
                       
                        </TouchableOpacity>
                        </View>

                        <View style={{alignItems:"flex-end",marginTop:15 }}>
                            <TouchableOpacity
                            onPress={this.toggleModal} 
                            >
                            <Text>Mot de passe oublié ?</Text>
                            </TouchableOpacity>
                        </View>    
                    </View>

                    
                    </ScrollView>      
        </View>
        );
    }
}

export default Connection;