import React, { Component} from 'react';
import { View, Text,  ScrollView } from 'react-native';
import { Button , Avatar , Icon} from 'react-native-elements';
import { Style }  from './styleProfile'
import { Form, Item, Input  } from 'native-base';
import AsyncStorage from '@react-native-community/async-storage';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import { presetColors} from '../../data/dataCasual'
import Menu from '../Menu/Menu'
var jwtDecode = require('jwt-decode');


class Profile extends Component {

    state = {
        login:undefined,
        email:undefined,
        password:undefined,
        changePassword:undefined,
        errorLoginCharacter:undefined,
        errorEmailCharacter:undefined,
        errorChangePwdCharacter:undefined,
        errorPwdCharacter:undefined,
        profileUser:undefined

    };

    
   componentDidMount(){

   }

   static async getDerivedStateFromProps(props, state){
    const profileUser=props.dataProfileUser
    // console.log("profile props",profileUser)
    console.log("Profile dans le get derived",profileUser)
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

    
    goToRegister=async (e)=>{

        e.preventDefault()
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




  render() {
    const { login , 
            email , 
            password,
            changePassword,
            errorChangePwdCharacter,
            errorEmailCharacter,
            errorLoginCharacter,
            errorPwdCharacter,
            profileUser
             } = this.state
   
    return (
     
        
        <AnimatedLinearGradient  customColors={presetColors.colorsProfile} speed={4000}> 
        <View style={Style.container}>
            <Menu nameMenu="Profil" navigation={this.props.navigation}/>
              <ScrollView
              bounces={true}
              style={Style.scrollview}
              showsVerticalScrollIndicator = {false}
             
              >
                <View style={{flexDirection:"row",  marginTop:30,}}>
                <Avatar
                    containerStyle={Style.avatar}
                    rounded
                    size={120}
                    source={{
                        uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
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
