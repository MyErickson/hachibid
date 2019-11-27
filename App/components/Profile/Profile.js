import React, { Component, Fragment} from 'react';
import { View, Text,  ScrollView } from 'react-native';
import { Button , Icon} from 'react-native-elements';
import { Style }  from './styleProfile'
import { Form, Item, Input ,Card } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Menu from '../../containers/Menu/Menu'
import AlertDialog from '../AlertDialog/AlertDialog';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


const options = {
  title: 'Selectionner un Avatar',
  mediaType:'photo',
  cancelButtonTitle:'annuler',
  takePhotoButtonTitle:"Prendre une Photo...",
  chooseFromLibraryButtonTitle:"Galerie...",
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};



class Profile extends Component {
  constructor(props){
      super(props);
      this.state = {
        login:"",
        email:"",
        password:"",
        errorLoginCharacter:undefined,
        errorEmailCharacter:undefined,
        errorPwdCharacter:undefined,
        errorPwd:undefined,
        profileUser:undefined,
        avatarSource:undefined,
        token:undefined,
        alertVisible:undefined,
        alertConfirm:undefined,
        style:undefined,
        logOutOrRegister:undefined,
        messageAlertPWd:undefined

    };
    this.picture=undefined
  }
    


   static async getDerivedStateFromProps(props, state){
       console.log(props.dataProfileUser)
    const profileUser =props.dataProfileUser
    state.token = props.receiveResponseConnection
    
    if(profileUser){
        state.profileUser=profileUser.data
    }
     
    }



    collectDataForUpdate=(evt)=>{
        
        const { name }  = evt._targetInst.pendingProps;
      
        const { text } = evt.nativeEvent;

        switch(name){
            case 'login':
                    if(text.length < 3  && text.trim() !== ''){
                        this.setState({errorLoginCharacter:true})
                    }else{
                        this.setState({errorLoginCharacter:false})
                    }
                break;
            case 'email':
                    if(text.length < 3  && text.trim() !== ''){
                        this.setState({errorEmailCharacter:true})
                    }else{
                        this.setState({errorEmailCharacter:false})
                    }
                break;
            case 'password':
                    if(text.length  < 4  && text.trim() !== ''){
                        this.setState({errorPwdCharacter:true})
                    }else{
                        this.setState({errorPwdCharacter:false})
                    }
                break;
   
            
        }
        
        this.setState({[name]:text})
         
    }

    
    goToRegister=()=>{

        const { login , 
            email , 
            password,
            token,
             } = this.state
        
        const {id} =  this.props.dataProfileUser.data  
         var messageErr = false;

        var data = new Object ;

        data.id= id ;
        data.token=token ;


            if(password.trim())  {
            data.password=password
           
            this.setState({errorPwd:false})
                 
            }

            if(login.trim()){
                data.login = login
              
            }

            if(email.trim()){
                data.email =email
            
            }
            if(login.trim().length < 0){
                console.log( "loool",login.trim())
            }
       
         if(login.trim()  &&  email.trim()  && password.trim() ){
            messageErr = false;
         }else{
            messageErr = true;
         }
            axios.defaults.headers['Authorization']= "Bearer "+data.token;
            axios.put(`users/${data.id}`,{
                
                    email:data.email,
                    username:data.login,
                    password:data.password,
                }).then((response)=>{
                console.log("axios update profile ",response.data)
            
                    this.setState({
                        login:"", 
                        email:"" , 
                        password:"",
                        changePassword:"",
                        messageAlert:messageErr?"Aucun champs a été remplis":"Modifié",
                        alertConfirm:false,
                        style:messageErr?false:true,
                        messageAlertPWd:undefined
        
                        })
              
                   this.props.receiveDataProfile(response)
               
            
                }).catch((err)=>{
                    console.log("axios error update profile ",err.response.data.violations)
                    err.response.data.violations.map((value)=>{
                        this.setState({
                            login:"", 
                            email:"" , 
                            password:"",
                            changePassword:"",
                            messageAlert:value.message,
                            alertConfirm:false,
                            style:false,
                            messageAlertPWd:undefined
            
                        })

                    })
                
                })  
       
    }


   logOut =()=>{
 
    AsyncStorage.removeItem('sessionJWT')
 
    this.props.initializeState()
    this.props.navigation.navigate("Connection")
   }

    yesConfirm=(logOutOrRegister)=>{
       
        if(logOutOrRegister === "register"){
            console.log("yes confir vaut ",logOutOrRegister)
            this.goToRegister()
        }else{
            this.logOut()
        }
    }
   
  closeAlert =()=>{
      this.setState({
        alertVisible:false,
      })
  }

   openModal =(text,logOutOrRegister)=>{
    this.setState({
        alertVisible:true,
        messageAlert:text,
        style:false,
        alertConfirm :true,
        logOutOrRegister,
      })
   }

  render() {
    const { login , 
            email , 
            password,
            errorEmailCharacter,
            errorLoginCharacter,
            errorPwdCharacter,
            profileUser,
            alertVisible,
            alertConfirm,messageAlert,style,
            logOutOrRegister
             } = this.state

   
    return (
     
         

        <Fragment>
            <Menu nameMenu="Profil" navigation={this.props.navigation}/>
            <View style={Style.container}>
              <ScrollView
              
              style={Style.scrollview}
              showsVerticalScrollIndicator = {false}
            keyboardShouldPersistTaps="always"
              >
         
       
                <Card style={Style.cardInfo}>
                <LinearGradient colors = {[ '#1285F0','#12EEF0']}style={Style.info}>
                    <Text style={{marginBottom:15,fontSize: 18}}>Identifiant: {profileUser && profileUser.username}</Text>
                    <Text style={{fontSize: 18}} >Mail: {profileUser && profileUser.email}</Text>
                    </LinearGradient>
                </Card>

            
            <View style={Style.form}>
            {this.state.errorPwd && <Text style={{color:"red",textAlign:'center'}}>Les mots de passe ne sont pas identiques</Text>}
                        <Form >
                           
                        <Item last style={Style.containerInput}>
                        <Icon  active name='person'/> 
                            <Input 
                       
                             name="login"
                             maxLength={255}
                             placeholder='Identifiant *'
                             value={login}
                             onChange={this.collectDataForUpdate}
                             />
                          
                        </Item>
                        { errorLoginCharacter && (<Text style={{color:'red',marginLeft:20}}>Il faut au moins 3 caractères</Text>)}
                        

                     
                        <Item last style={Style.containerInput}>
                        <Icon  active name='mail'/> 
                            <Input 
                            placeholder='E-mail *'
                            name="email"
                            maxLength={255}
                            value={email}
                            onChange={this.collectDataForUpdate}/>
                        </Item>

                        { errorEmailCharacter && (<Text style={{color:'red',marginLeft:20}}>Il faut au moins 4 caractères</Text>)}

                        
                        <Item last style={Style.containerInput}>
                        <Icon  active name='lock'/> 
                         <Input 
                         placeholder='Changer mon mot de passe *'
                         name="password"
                         secureTextEntry={true}
                         maxLength={255}
                         value={password}
                         onChange={this.collectDataForUpdate}/>
                     </Item>
                     {errorPwdCharacter && (<Text style={{color:'red',marginLeft:20}}>Il faut au moins 4 caractères</Text>)}
                
                        </Form>
                 
               
                        <Button 
                        containerStyle={Style.button}
                        buttonStyle={{borderRadius:30, backgroundColor:'rgba(41,113,232,0.8)'}}
                        onPress= {()=>this.openModal("êtes vous sur de vouloir modifier vos informations ?","register") }
                        title= 'Modifier'
                       />
                        <Button 
                        containerStyle={Style.button}
                        buttonStyle={{borderRadius:30, backgroundColor:'rgba(232,63,63,0.8)'}}
                        onPress= {()=>this.openModal("êtes vous sur de vouloir vous déconnecter ?","logOut") }
                        title= 'déconnexion'
                       />
                       
                </View>             
                </ScrollView>  

                <AlertDialog 
                    alertVisible={alertVisible}
                    messageAlert={messageAlert}
                    closeAlert={this.closeAlert}
                    style={style}
                    logOutOrRegister={logOutOrRegister}
                    alertConfirm={alertConfirm }
                    yesConfirm={this.yesConfirm}
                 />
            </View>
            </Fragment>
 
    )}
}

export default Profile;
