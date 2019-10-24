import React, { Component} from 'react';
import { View, Text,  ScrollView } from 'react-native';
import { Button , Avatar , Icon} from 'react-native-elements';
import { Style }  from './styleProfile'
import { Form, Item, Input  } from 'native-base';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import { presetColors} from '../../data/dataCasual'
import Menu from '../Menu/Menu'
import ImagePicker from 'react-native-image-picker';
import {request, PERMISSIONS} from 'react-native-permissions';
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
        login:undefined,
        email:undefined,
        password:undefined,
        changePassword:undefined,
        errorLoginCharacter:undefined,
        errorEmailCharacter:undefined,
        errorChangePwdCharacter:undefined,
        errorPwdCharacter:undefined,
        profileUser:undefined,
        avatarSource:undefined

    };
    this.picture=undefined
  }
    

    
   async componentDidMount(){
     try{

        const permissionPicture= await request(PERMISSIONS.ANDROID.CAMERA)

        this.picture=permissionPicture
       
      }catch(err){
          console.log("eroor permission picture====== >",err)
      }
   }

   static async getDerivedStateFromProps(props, state){
    const profileUser=props.dataProfileUser
   
    // console.log("Profile dans le get derived",profileUser)
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
             } = this.state
             const {id} =  this.props.dataProfileUser.data  
          console.log('profile fontion gotoregister',id)
             var data = new Object 
             data.id= id;

             if(login){
                 data.login = login
             }
             if(email){
                 data.email =email
             }
             if(password && password === changePassword)  {
               
                    data.password=password
                
             }else{

             }
            
        await this.props.sendDataUpdateProfile(data)

    
    
        this.setState({
                login:undefined , 
                email:undefined  , 
                password:undefined ,
                changePassword:undefined ,
        })
    }


   goToRegisterPicture=()=>{

         ImagePicker.showImagePicker(options, (response) => {
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
                    // You can also display the image using data:
                    // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                this.setState({
                avatarSource: source,
                });
            }
        });     

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
            avatarSource
             } = this.state

    const avatarDefault = { uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }
   
    return (
     
         
        <AnimatedLinearGradient  customColors={presetColors.colorsProfile} speed={4000}> 
    
            <Menu nameMenu="Profil" navigation={this.props.navigation}/>
            <View style={Style.container}>
              <ScrollView
              
              style={Style.scrollview}
              showsVerticalScrollIndicator = {false}
               keyboardShouldPersistTaps="always"
              >
                <View style={{flexDirection:"row",  marginTop:30,}}>
                <Avatar
                   onPress={this.goToRegisterPicture}
                    containerStyle={Style.avatar}
                    rounded
                    size={120}
                    source={ avatarSource ? avatarSource : avatarDefault}
                />
                <View style={{margin:35 }}>
                    <Text style={{marginBottom:15,fontSize: 18}}>{profileUser && profileUser.username}</Text>
                    <Text style={{fontSize: 18}} >{profileUser && profileUser.email}</Text>
                </View>
              </View>
            <View style={Style.form}>
              
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
                        { errorLoginCharacter && (<Text style={{color:'red'}}>Il faut au moins 3 caractères</Text>)}
                        

                     
                        <Item last style={Style.containerInput}>
                        <Icon  active name='mail'/> 
                            <Input 
                            placeholder='E-mail *'
                            name="email"
                            maxLength={255}
                            value={email}
                            onChange={this.collectDataForUpdate}/>
                        </Item>

                        { errorEmailCharacter && (<Text style={{color:'red'}}>Il faut au moins 4 caractères</Text>)}

                        
                        <Item last style={Style.containerInput}>
                        <Icon  active name='lock'/> 
                         <Input 
                         placeholder='Mot de passe *'
                         name="password"
                         secureTextEntry={true}
                         maxLength={255}
                         value={password}
                         onChange={this.collectDataForUpdate}/>
                     </Item>
                     {errorPwdCharacter && (<Text style={{color:'red'}}>Il faut au moins 4 caractères</Text>)}
                    

                    
                    
                     <Item last style={Style.containerInput}>
                     <Icon  active name='lock'/> 
                         <Input 
                         placeholder='Changer mon mot de passe *'
                         name="changePassword"
                         secureTextEntry={true}
                         maxLength={255}
                         value={changePassword}
                         onChange={this.collectDataForUpdate}/>
                     </Item>
                     {errorChangePwdCharacter && (<Text style={{color:'red'}}>Il faut au moins 4 caractères</Text>)}
                        </Form>
                 
               
                        <Button 
                        containerStyle={Style.button}
                        buttonStyle={{borderRadius:30, backgroundColor:'rgba(41,113,232,0.8)'}}
                        onPress= {this.goToRegister}
                        title= 'Modifier'
                       />
                       
                </View>             
                </ScrollView>  

          
            </View>
            </AnimatedLinearGradient>
 
    )}
}

export default Profile;
