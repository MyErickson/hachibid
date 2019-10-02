import React, { Component } from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import {  Header, Left, Body, Right, Icon, Title} from 'native-base';

import { Style } from './styleMenu'


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer:false
    };
   
  }

  render() {
    var navigationView = (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>I'm in the Drawer!</Text>
      </View>
    );
    return (
     
      <View>
        <Header style={Style.container}>
            <Left style={{flex:1}} >
              <TouchableOpacity 
              onPress={this.props.toggle}>
                <Icon style={Style.icon} name='menu' />
              </TouchableOpacity>
            </Left>
        
          <Body style={{flex:1}} >
            <Title  style={{ alignSelf: 'center'}}>{this.props.nameMenu}</Title>
          </Body>
   
          <Right style={{flex:1}}>
            <TouchableOpacity onPress={this.props.toggle}>
              <Icon style={Style.icon} name='notifications' />
            </TouchableOpacity>
          </Right>
        </Header>
   
    </View>
    
    );
  }
}

export default Menu;
