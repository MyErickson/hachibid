import React, { Component, Fragment} from 'react';
import { View, Text,  ScrollView } from 'react-native';
import { Button , Avatar , Icon} from 'react-native-elements';
import { Style }  from './styleProfile'
import { Form, Item, Input ,Card } from 'native-base';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import LinearGradient from 'react-native-linear-gradient';
import { presetColors} from '../../data/dataCasual'
import Menu from '../Menu/Menu'
import AlertDialog from '../AlertDialog/AlertDialog';
import ImagePicker from 'react-native-image-picker';
import {request, PERMISSIONS} from 'react-native-permissions';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP } from 'react-native-responsive-screen';



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
        changePassword:"",
        errorLoginCharacter:undefined,
        errorEmailCharacter:undefined,
        errorChangePwdCharacter:undefined,
        errorPwdCharacter:undefined,
        errorPwd:undefined,
        profileUser:undefined,
        avatarSource:undefined,
        token:undefined,
        alertVisible:undefined,
        alertConfirm:undefined,
        style:undefined,
        logOutOrRegister:undefined

    };
    this.picture=undefined
  }
    

    
   async componentDidMount(){
    //  try{

    //     const permissionPicture= await request(PERMISSIONS.ANDROID.CAMERA)

    //     this.picture=permissionPicture
       
    //   }catch(err){
    //       console.log("eroor permission picture====== >",err)
    //   }
   }



   static async getDerivedStateFromProps(props, state){
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

    
    goToRegister=async()=>{

        
        const { login , 
            email , 
            password,
            changePassword,
            token,
             } = this.state
        
        const {id} =  this.props.dataProfileUser.data  
             
       console.log("le login vaut",login)

             var data = new Object ;

             data.id= id ;
             data.token=token ;

             if(login){
                 data.login = login
             }

             if(email){
                 data.email =email
             }

             if(password.trim() && password === changePassword)  {
               
                    data.password=password
                    this.setState({errorPwd:false})
                    
             }else if (password.trim() && password !== changePassword){
                this.setState({errorPwd:true})
             }
            
             await this.props.sendDataUpdateProfile(data)

             this.setState({
                login:"", 
                email:"" , 
                password:"",
                changePassword:"",
                messageAlert:" Modifié",
                alertConfirm:false,
                style:true

        })
    
       
    }


   goToRegisterPicture= ()=>{
    const { token  } = this.state
    const {id} =  this.props.dataProfileUser.data  
    var data = new Object ;
         ImagePicker.showImagePicker(options, async(response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    const source = { uri: response.uri };
                        console.log("data uri de la picture",response.uri)
                        data.id= id
                        data.token = token
                        data.image = response.uri
                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                await this.props.sendDataUpdateProfile(data)
            }
        });     

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
            changePassword,
            errorChangePwdCharacter,
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
                    

                    
                    
                     <Item last style={Style.containerInput}>
                     <Icon  active name='lock'/> 
                         <Input 
                         placeholder='Confirmation du mot de passe *'
                         name="changePassword"
                         secureTextEntry={true}
                         maxLength={255}
                         value={changePassword}
                         onChange={this.collectDataForUpdate}/>
                     </Item>
                     {errorChangePwdCharacter && (<Text style={{color:'red',marginLeft:20}}>Il faut au moins 4 caractères</Text>)}
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
