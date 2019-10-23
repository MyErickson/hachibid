import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Menu from '../Menu/Menu';
import { Style } from './styleNotification';
import  { casualList } from '../../data/dataCasual'

class Notification extends Component {

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
//   static async getDerivedStateFromProps(props, state){
//     const { params } = props.navigation.state
//     // await this.props.receiveDataCategory(params.nameCategory)

//      const allCategory =  props.dataStateAllCategory
//        state.allCategory= allCategory
//   }

  goToCategoryPage=(value)=>{
    this.props.navigation.navigate('MessageCategory',{
        nameCategory:value,
        navigation:this.props.navigation
    })
 }

  render() {
     const { allCategory } =this.state
   
    return (
      <View style={{flex:1}}>
        <Menu nameMenu="Notification" navigation={this.props.navigation} />
     
        <ScrollView
              bounces={true}
              style={Style.scrollview}
              showsVerticalScrollIndicator={false}
             
              >
        <Card containerStyle={{padding: 0}} >
        {
            casualList.map((item, i) => {
            return (
                <ListItem
                key={i}
                roundAvatar
                title={item.name}
                leftIcon={{ name: 'notifications' }}
                bottomDivider
                chevron
                onPress={()=>this.goToCategoryPage(item.name)}
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

export default Notification;
