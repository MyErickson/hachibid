import React, { Component, Fragment } from 'react';
import { View, Text, TouchableOpacity , ScrollView } from 'react-native';
import { Button , Avatar } from 'react-native-elements';
import { Style }  from './styleProfile'
import { Container, Content, Form, Item, Input , Label } from 'native-base';
import Menu from '../Menu/Menu'

class Profile extends Component {

    state = {
        login:undefined,
        email:undefined,
        password:undefined,
        changePassword:undefined,
        errorLoginCharacter:undefined,
        errorEmailCharacter:undefined,
        errorChangePwdCharacter:undefined,
        errorPwdCharacter:undefined

    };
  
    collectDataForUpdate=(evt)=>{
        
        const { name }  = evt._targetInst.pendingProps;
      
        const { text } = evt.nativeEvent;

        switch(name){
            case 'login':
                    if(text.length < 3){
                        this.setState({errorLoginCharacter:true})
                    }else{
                        this.setState({errorLoginCharacter:false})
                    }
                break;
            case 'email':
                    if(text.length < 3){
                        this.setState({errorEmailCharacter:true})
                    }else{
                        this.setState({errorEmailCharacter:false})
                    }
                break;
            case 'password':
                    if(text.length  < 4){
                        this.setState({errorPwdCharacter:true})
                    }else{
                        this.setState({errorPwdCharacter:false})
                    }
                break;
            case 'changePassword':
                    if(text.length  < 4){
                        this.setState({errorChangePwdCharacter:true})
                    }else{
                        this.setState({errorPwdCharacter:false})
                    }
                break;
                
        }
        
        this.setState({[name]:text})
         
    }

    
    goToRegister=async ()=>{
        const { login , 
            email , 
            password,
            changePassword,
             } = this.state
             
    // await this.props.sendDataUpdateProfile(login ,email, password,changePassword)

    // const {dataProfileUser} = await this.props

    // this.setState({
    //         login:dataProfileUser.login , 
    //         email:dataProfileUser.email , 
    //         password:dataProfileUser.password,
    //         changePassword:dataProfileUser.confPwd,
    // })
    }




  render() {
    const { login , 
            email , 
            password,
            changePassword,
            errorChangePwdCharacter,
            errorEmailCharacter,
            errorLoginCharacter,
            errorPwdCharacter
             } = this.state

    return (
     
          
        <View style={Style.container}>
            <Menu nameMenu="Profil" toggle={this.props.navigation.toggleDrawer}/>
              <ScrollView
              bounces={true}
              style={Style.scrollview}
              showsVerticalScrollIndicator = {false}
             
              >
                <Avatar
                    containerStyle={Style.avatar}
                    rounded
                    size="xlarge"
                    source={{
                        uri:
                        'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
                    }}
                />
              
          
              <ScrollView
              bounces={true}
              style={Style.scrollview}
              showsVerticalScrollIndicator = {false}
             
              >
            <View style={Style.form}>
                <Container>
                    <Content>  
                        <Form >
                             <Label style={Style.label}>Identifiant *</Label>
                        <Item last  regular style={Style.containerInput}>
                       
                            <Input 
                       
                             name="login"
                             maxLength={255}
                             value={login}
                             onChange={this.collectDataForUpdate}
                             />
                          
                        </Item>
                        { errorLoginCharacter && (<Text style={{color:'red'}}>Il faut au moins 3 caractères</Text>)}
                        

                        <Label style={Style.label}>E-mail *</Label>
                        <Item last regular style={Style.containerInput}>
                         
                            <Input 
                      
                            name="email"
                            maxLength={255}
                            value={email}
                            onChange={this.collectDataForUpdate}/>
                        </Item>

                        { errorEmailCharacter && (<Text style={{color:'red'}}>Il faut au moins 4 caractères</Text>)}

                        <Label style={Style.label}>Mot de passe *</Label>
                        <Item last regular style={Style.containerInput}>
                         
                         <Input 
                        
                         name="password"
                         secureTextEntry={true}
                         maxLength={255}
                         value={password}
                         onChange={this.collectDataForUpdate}/>
                     </Item>
                     {errorPwdCharacter && (<Text style={{color:'red'}}>Il faut au moins 4 caractères</Text>)}
                    

                     <Label style={Style.label}>Changer mon mot de passe *</Label>
                    
                     <Item last regular style={Style.containerInput}>
                         
                         <Input 
                
                         name="changePassword"
                         secureTextEntry={true}
                         maxLength={255}
                         value={changePassword}
                         onChange={this.collectDataForUpdate}/>
                     </Item>
                     {errorChangePwdCharacter && (<Text style={{color:'red'}}>Il faut au moins 4 caractères</Text>)}
                        </Form>
                 
                    </Content>
                </Container>

                </View>             
                </ScrollView>  
            
                <Content>

                    <Button rounded info 
                        containerStyle={Style.button}
                        onPress= {this.goToRegister}
                        title= 'se connecter'
                    />
                       
                   
                </Content>
                </ScrollView>  
            </View>
          
 
    )}
}

export default Profile;
