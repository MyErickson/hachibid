import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import Menu from '../Menu/Menu';
import filtrate from '../Filtrate/Filtrate';
const users = [
    {
        title: 'Categorie 1',
        icon: 'av-timer'
      },
      {
        title: 'Categorie 2',
        icon: 'flight-takeoff'
      },
      {
        title: 'Categorie 3',
        icon: 'av-timer'
      },
      {
        title: 'Categorie 4',
        icon: 'flight-takeoff'
      },
      {
        title: 'Categorie 5',
        icon: 'av-timer'
      },

];

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
    const { params } = props.navigation.state
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

  render() {
     const { allCategory } =this.state
   
    return (
      <View>
        <Menu nameMenu="Catégories" toggle={this.props.navigation.toggleDrawer}/>
        <Filtrate searchBar={this.searchBar}/>
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
      </View>
    );
  }
}

export default Category;
