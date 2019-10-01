import React, { Component } from 'react';
import { View, TouchableOpacity , ScrollView} from 'react-native';
import {  Item , Container, Content , Textarea, Icon} from 'native-base';
import { Style} from './styleChatHome'
import Menu from '../Menu/Menu'
import ShowMessage from './ShowMessage';


class ChatHome extends Component {
 
    state = {
      message:undefined,
      dataMessageCasual:[],
      show:false
    }
  

  writeMessage=(message)=>{
    this.setState({message , show:false}) 
  }

  sendDataMessage=()=>{
   
    const { message,dataMessageCasual } =this.state
    this.setState({dataMessageCasual:[...dataMessageCasual,{
                                        login:'erickson',
                                        message
                                      }], 
                    message: undefined,
                    show:true
                  })
  }

 
  render() {
 
   const { show , dataMessageCasual } =this.state

    return (
      <View style={Style.container}>
        <Menu nameMenu="Chat Général" />
      
        <View style={Style.messageContainer}>
        <ScrollView style={Style.scrollView}>
         
            <View style={Style.message}>
              { dataMessageCasual && (<ShowMessage allMessage={dataMessageCasual} show={show}/>)}
              
            </View>
            </ScrollView>
        </View>
       
        <View  style={Style.containerInput}>
          <Container>
            <Content>
              <Item regular style={{borderRadius:30, borderColor:'black'}}>
                <Textarea
                style={Style.input} 
                value={this.state.message}
                multiline
                maxLength={255}
                onChangeText={this.writeMessage}
                />
              </Item>
            </Content>
          </Container>
        <TouchableOpacity
          onPress={this.sendDataMessage}
        >
          <View style={Style.icon} >
            <Icon  name="paper-plane" />
          </View>
        </TouchableOpacity>
        </View >      
      </View>
    );
  }
}

export default ChatHome;
