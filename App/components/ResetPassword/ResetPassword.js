import React, { Component, Fragment } from 'react'
import { Text, View ,TouchableOpacity } from 'react-native'
import { Content, Item, Input, Container } from 'native-base';
import { Button } from 'react-native-elements';
import Modal from "react-native-modal";
import { Style } from './styleResetPassword'
import LinearGradient from 'react-native-linear-gradient';
export class ResetPassword extends Component {
    state={
        email:undefined,
        messageErrorForReset:undefined,
        modalVisible: this.props.isModalVisible,
    }

    
    sendInformationForReset= async()=>{

        const { email } = this.state;

        await this.props.sendDataForReset( email );
        const validateForReset = await this.props.receiveResponseForReset
     
        if (validateForReset){
            this.setState({
                email:undefined,
            })
            this.setState({messageErrorForReset:false})
            this.props.navigation.navigate('Connection')
        }else{
            this.setState({messageErrorForReset:true})
        }
    }

    goToRegister=()=>{
        this.props.navigation.navigate('Register')
    }

    render() {
        return (
            <Modal style={{height:10}} 
             isVisible={this.props.isModalVisible}
             onSwipeMove={() => this.setState({ modalVisible: false })}
             swipeDirection={"left","right"}
             >
 
               <Container  style={ Style.container}>
             <Content>
            { this.state.messageErrorForReset && 
                  (<Text style={{color:'red',marginBottom: 20}}>Mot de passe ou Idientifiant incorrect</Text>)
            }
                <Text style={{margin: 10}}>Entrer votre email pour renitialiser votre mot de passe</Text>
                <View style={{width:300}}>
                    <Item last regular style={Style.containerInput}>
                            
                        <Input 
                        style={Style.input} 
                        placeholder="email *" 
                        name="email"
                        maxLength={255}
                        value={this.state.email}
                        onChange={this.collectLoginAndPwd}/>
        
        
                    </Item>  
         

                </View>
                <Button 
                     containerStyle={Style.button}
                     onPress= {this.sendInformationForReset}
                     title= 'envoyer'
                     ViewComponent={LinearGradient}
                     linearGradientProps={{
                        colors: [ 'rgb(14, 65, 144)','rgb(160, 190, 235)'],
                        start: { x: 0, y: 0.5 },
                        end: { x: 1, y: 0.5 },
                      }}
                 />
                    <Button rounded info 
                     containerStyle={Style.button}
                     onPress= {()=>this.props.toggleModal()}
                     title= 'envoyer'
                 />
               </Content>
               </Container> 

             </Modal>
          
)
    }
}

export default ResetPassword
