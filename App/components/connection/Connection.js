import React, { Component, Fragment } from 'react';
import { View , Text , TouchableOpacity} from 'react-native';
import { Button } from 'react-native-elements';
import { Style }  from './styleConnection'
import { Container, Content, Form, Item, Input } from 'native-base';
import axios from "axios";

class Connection extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            login:undefined,
            password:undefined,
            messageErrorConnection:undefined,
            showResetPassword:false,
         };
    }



    collectLoginAndPwd=(evt)=>{

        const { name }  = evt._targetInst.pendingProps;
        const { text } = evt.nativeEvent;
        this.setState({[name]:text})
    }

    sendInformation= async()=>{

        const { login , password } = this.state;

        await this.props.sendDataConnection( login , password );
        const validateConnection = await this.props.receiveResponseConnection
      
        if (validateConnection){
            this.setState({
                login:undefined,
                password:undefined,
            })
            this.setState({messageErrorConnection:false})
            this.props.navigation.navigate('ChatHome')
        }else{
            this.setState({messageErrorConnection:true})
        }
    }


    goToRegister=()=>{
        this.props.navigation.navigate('Register')
    }

    goToresetPassword=()=>{
        this.props.navigation.navigate('ResetPassword')
    }


    render() {
        const { login , password, messageErrorConnection} = this.state
        
        return (
            <View style={Style.container}>
                { messageErrorConnection && 
                  (<Text style={{color:'red'}}>Mot de passe ou Idientifiant incorrect</Text>)
                }
                <View style={Style.form}>
                <Container>
                    <Content>  
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
                                name="password"
                                maxLength={255}
                                value={password}
                                onChange={this.collectLoginAndPwd}/>
                            </Item>
                        </Form>
                        <View style={{alignItems:"flex-end"}}>
                            <TouchableOpacity
                            onPress={this.goToresetPassword}
                            >
                            <Text>Mot de passe oublié ?</Text>
                            </TouchableOpacity>
                        </View>
                    </Content>
                </Container>

                </View>             
           
            
                <Content>

                    <Button rounded info 
                        containerStyle={Style.button}
                        onPress= {this.sendInformation}
                        title= 'se connecter'
                    />
                       
                    <View 
                        style={ Style.textRegister}
                    >
                        <TouchableOpacity
                        onPress={this.goToRegister}
                        >
                            <Text style={{ color:'blue'}}
                            > 
                                Vous n'avez pas de compte ? inscrivez-vous  
                            </Text>
                       
                        </TouchableOpacity>
                        
                    </View>
                </Content>
              
            </View>
        );
    }
}

export default Connection;