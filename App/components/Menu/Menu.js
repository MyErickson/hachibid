import React, { Component } from 'react';
import { View, TouchableOpacity, Text} from 'react-native';
import {  Header, Left, Body, Right, Icon, Title} from 'native-base';
// import DrawerLayout from 'react-native-gesture-handler/DrawerLayout'
import { Style } from './styleMenu'


class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawer:false
    };
   
  }
  closeControlPanel = () => {
    this.setState({drawer:false})
  };
  openControlPanel = () => {
    this.setState({drawer:true})
  };
  renderDrawer = () => {
    return (
      <View>
        <Text>I am in the drawer!</Text>
      </View>
    );
  };
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
              onPress={() => openDrawer()}>
                <Icon style={Style.icon} name='menu' />
              </TouchableOpacity>
            </Left>
        
          <Body style={{flex:1}} >
            <Title  style={{ alignSelf: 'center'}}>PROFIL</Title>
          </Body>
   
          <Right style={{flex:1}}>
            <TouchableOpacity onPress={()=> closeDrawer()}>
              <Icon style={Style.icon} name='home' />
            </TouchableOpacity>
          </Right>
        </Header>
        {/* <DrawerLayout
          open={false}
          drawerWidth={200}
          drawerPosition={DrawerLayout.positions.Right}
          drawerType='front'
          drawerBackgroundColor="#ddd"
          renderNavigationView={this.renderDrawer}>
          
                 <View>
            <Text>
              Hello, it's me
            </Text>
          </View>
        </DrawerLayout> */}
    </View>
    
    );
  }
}

export default Menu;
