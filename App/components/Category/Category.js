import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Menu from '../Menu/Menu';
import Filtrate from '../Filtrate/Filtrate';
import { Style } from './styleCategory';
import AsyncStorage from '@react-native-community/async-storage';

class Category extends Component {

    state = {
        allCategory:undefined
    }
  
    async componentDidMount(){
      await this.props.dataAllCategory()
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
    // const { params } = props.navigation.state
    // await this.props.receiveDataCategory(params.nameCategory)

      const allCategory =  props.dataStateAllCategory
      state.allCategory= allCategory
  }

  goToCategoryPage=(value)=>{
    this.props.navigation.navigate('MessageCategory',{
        nameCategory:value,
        navigation:this.props.navigation
    })
 }


 componentWillUnmount(){
  console.log("je suis dmeonter category")
    AsyncStorage.removeItem('sessionJWT')
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
                title={item}
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
