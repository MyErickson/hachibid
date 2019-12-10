import React, { Component  } from 'react';
import { View , Text , TouchableOpacity, Animated,ScrollView , Dimensions} from 'react-native';
import { Button } from 'react-native-elements';
import {  Content, Form, Item, Input } from 'native-base';
import ResetPassword from "../ResetPassword/ResetPassword"
import Wave from 'react-native-waveview'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import AlertDialog from '../AlertDialog/AlertDialog';
import LinearGradient from 'react-native-linear-gradient';
import { Style } from './styleConnection'
import NetInfo from "@react-native-community/netinfo";
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
         this.input = {}
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
        var isInternetReachable 
        var isConnected  
        const { login , password } = this.state;
        await NetInfo.fetch().then(state => {
            isInternetReachable = state.isInternetReachable
            isConnected  = state.isConnected 
       
          });
          if(isConnected && isInternetReachable){
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
          }else{
            this.setState({
                alertVisible:true,
                style:false,
                messageAlert:`Vous n'avez pas de reseau mobile ou wifi`
            })
          }
           
           
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
            style={{flex:1,height:500}}
            >
               <ScrollView
                 
                showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="always"
            
                 >
             <LinearGradient colors = {[ '#1285F0','#12EEF0']}>
      
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
                                 onSubmitEditing={()=>this.input["password"]._root.focus()}
                                 returnKeyType="next"
                                 />
                              
                            </Item>
                            <Item last regular style={Style.containerInput}>
                             
                                <Input 
                                ref = { input => this.input["password"] = input}
                                placeholder="Mot de passe *" 
                                secureTextEntry={true}
                                name="password"
                                maxLength={255}
                                value={password}
                                onChange={this.collectLoginAndPwd}
                                onSubmitEditing={this.sendInformation}
                                returnKeyType="send"
                                />
                                 
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
            
            </LinearGradient>
            <View style={Style.waveContainer} > 
                    <Wave
                        style={Style.wave}
                        H={28}
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