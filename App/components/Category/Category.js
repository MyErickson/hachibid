import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Menu from '../Menu/Menu';
import Filtrate from '../Filtrate/Filtrate';
import { Style } from './styleCategory';
import AsyncStorage from '@react-native-community/async-storage';

class Category extends Component {

    state = {
        allCategory:undefined,
        receiveResponseConnection:undefined
    }
  
    async componentDidMount(){
      await this.props.dataAllCategory(this.props.receiveResponseConnection)
    }

    searchBar= async (text)=>{
          console.log(text)
      //   await this.props.sendDataFilterCategory(text)
      //   const category = await this.props.dataFilterCategory
      // this.setState({
      //     category
      // })

    }
  static async getDerivedStateFromProps(props, state){
  
    state.receiveResponseConnection=props.receiveResponseConnection
    state.allCategory =  props.dataStateAllCategory
     console.log(props.dataStateAllCategory)

  }

  goToCategoryPage=async (value)=>{
    const { receiveResponseConnection } =this.state
    await this.props.dataAllCategory(receiveResponseConnection)

     var data = new Object
     data.token = receiveResponseConnection
     data.id = value.id

    this.props.receiveDataMessagesCategory(data)
    this.props.navigation.navigate('MessageCategory',{
        nameCategory:value.title,
        navigation:this.props.navigation
    })
 }






  render() {
     const { allCategory } =this.state
   
    return (
      <View style={{flex:1}}>
        <Menu nameMenu="Catégories" navigation={this.props.navigation}/>
        <Filtrate searchBar={this.searchBar}/>
        <ScrollView
              bounces={true}
              style={Style.scrollview}
              showsVerticalScrollIndicator={false}
             
              >
        <Card containerStyle={{padding: 0}} >
        {
            allCategory && allCategory.map((item, i) => {
            return (
                <ListItem
                key={i}
                roundAvatar
                title={item.title}
                leftIcon={{ name: 'star' }}
                bottomDivider
                chevron
                onPress={()=>this.goToCategoryPage(item)}
                />
            );
            })
        }
    </Card>
    </ScrollView>  
      </View>
    );
  }
}

export default Category;
