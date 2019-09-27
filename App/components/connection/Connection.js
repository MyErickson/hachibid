import React, { Component } from 'react';
import { View , Text , TouchableHighlight} from 'react-native';
import { Avatar , Icon, Button } from 'react-native-elements';
import { Style }  from './styleConnection'
import { Container, Content, Form, Item, Input, Label } from 'native-base';
class Connection extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            login:undefined,
            password:undefined
         };
    }

    collectLoginAndPwd=(evt)=>{

        const { name }  = evt._targetInst.pendingProps
        const { text } = evt.nativeEvent
        this.setState({[name]:text})
    }
    sendInformation=()=>{
        console.log('e')
    }

    render() {
        return (
            <View style={Style.container}>
                <View style={Style.form}>
                <Container>
                    <Content>
                        <Form >
                            <Item last  regular style={Style.containerInput}>
                         
                                <Input 
                                 style={Style.input}  
                                 placeholder="Identitfiant*" 
                                 value={this.state.login}
                                 onChange={this.collectLoginAndPwd}
                                 />
                              
                            </Item>
                            <Item last regular style={Style.containerInput}>
                             
                                <Input 
                                style={Style.input} 
                                placeholder="Mot de passe*" 
                                name="pwd"
                                value={this.state.password}
                                onChange={this.collectLoginAndPwd}/>
                            </Item>
                        </Form>
                        <View style={{alignItems:"flex-end"}}>
                            <Text>Mot de passe oublié ? </Text>
                        </View>
                    </Content>
                </Container>

                </View>
            
                <Content>

                    <Button rounded info 
                        containerStyle={Style.button}
                        onPress={this.sendInformation}
                        title='se connecter'
                    />
                       
                    <View 
                        style={ Style.textRegister}
                   
                    
                    >
                        
                            <Text style={{color:'blue'}}
                            onPress={()=>console.log('register')}
                            > 
                                Vous n'avez pas de compte ? inscrivez-vous  
                            </Text>
                        
                    </View>
                </Content>
              
            </View>
        );
    }
}

export default Connection;