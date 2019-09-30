import React, { Component } from 'react';
import { View , Text , TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import { Style }  from './styleRegister'
import { Container, Content, Form, Item, Input, Label } from 'native-base';



class Register extends Component {
  
    state = { 
        login:undefined,
        email:undefined,
        password:undefined,
        confPWD:undefined,
        errorLoginCharacter:undefined,
        errorEmailCharacter:undefined,
        errorPwdCharacter:undefined
     };
    
     collectDataForRegister =(evt)=>{
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
                
        }
       
        this.setState({[name]:text})
     }

     sendInformation= async ()=>{
        const { login , password } = this.state;
      
        await this.props.sendDataRegister( login , email , password ,confPWD )
        const validateRegister = await this.props.receiveResponseRegister
        if (validateRegister){
            this.setState({
                login:undefined,
                email:undefined,
                password:undefined,
                confPWD:undefined,
            })
            // this.props.navigation.goBack()
        }
          
    
    }

    render() {
        return (
            <View style={Style.container}>
            <View style={Style.form}>
            <Container>
                <Content>
                    <Form >
                    <Label style={Style.label}>Identifiant *</Label>
                        <Item last  regular style={Style.containerInput}>
                       
                            <Input 
                             style={Style.input} 
                             name="login"
                             maxLength={255}
                             value={this.state.login}
                             onChange={this.collectDataForRegister}
                             />
                          
                        </Item>
                        { this.state.errorLoginCharacter && (<Text style={{color:'red'}}>Il faut au moins 3 caractères</Text>)}
                        

                        <Label style={Style.label}>E-mail *</Label>
                        <Item last regular style={Style.containerInput}>
                         
                            <Input 
                            style={Style.input} 
                            name="email"
                            maxLength={255}
                            value={this.state.email}
                            onChange={this.collectDataForRegister}/>
                        </Item>

                        { this.state.errorEmailCharacter && (<Text style={{color:'red'}}>Il faut au moins 4 caractères</Text>)}

                        <Label style={Style.label}>Mot de passe *</Label>
                        <Item last regular style={Style.containerInput}>
                         
                         <Input 
                         style={Style.input}
                         name="password"
                         secureTextEntry={true}
                         maxLength={255}
                         value={this.state.password}
                         onChange={this.collectDataForRegister}/>
                     </Item>
                     {this.state.errorPwdCharacter && (<Text style={{color:'red'}}>Il faut au moins 4 caractères</Text>)}
                    

                     <Label style={Style.label}>Confirmation du mot de passe *</Label>
                    
                     <Item last regular style={Style.containerInput}>
                         
                         <Input 
                         style={Style.input} 
                         name="confPWD"
                         secureTextEntry={true}
                         maxLength={255}
                         value={this.state.confPWD}
                         onChange={this.collectDataForRegister}/>
                     </Item>

                    
                    </Form>
               
                </Content>
            </Container>

            </View>
        
            <Content>

                <Button rounded info 
                    containerStyle={Style.button}
                    onPress={this.sendInformation}
                    title='Valider'
                />
                   
                <View 
                    style={ Style.textRegister}
                >
                    
                </View>
            </Content>
          
        </View>
        );
    }
}

export default Register;