import React, { Fragment } from 'react';

import {  View , Text,TouchableOpacity , Image , ScrollView} from 'react-native';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import { Styles } from './styleMenuDrawer';
import { Icon,Container, Header, Content, List, ListItem, } from 'native-base';
import { casualList} from '../../data/dataCasual'
import { presetColors } from '../../data/dataCasual'




export default class MenuDrawer extends React.Component{
     state={
         list:false,
         topDataCategory:undefined,
         profileUser:undefined,
         receiveResponseConnection:undefined
     }



    static async getDerivedStateFromProps(props, state){ 
       
        const { receiveResponseConnection ,
           
            topDataCategory ,
            dataProfileUser} = props

        state.topDataCategory =  topDataCategory 
        
        if(dataProfileUser){
            state.profileUser = dataProfileUser.data.username
           
        }
        if(receiveResponseConnection){
           
           state.receiveResponseConnection = receiveResponseConnection
        }
        
    }
   
     toggleList=()=>{
        
         const { list ,receiveResponseConnection } = this.state
         this.props.receiveTopDataCategory(receiveResponseConnection)
            this.setState({list:!list})
     }
      
     goToCategoryPage=(value)=>{
        this.props.navigation.navigate('MessageCategory',{
            nameCategory:value,
            navigation:this.props.navigation
        })
     }


    gotToNavLink=async (nav)=>{
        const { receiveResponseConnection } =this.state
        await this.props.dataAllCategory(receiveResponseConnection)
        if(nav === 'Category'){
            this.props.navigation.navigate(nav,{
                nameCategory:nav
            })
            this.props.navigation.toggleDrawer()
        }else{
            this.props.navigation.navigate(nav)
            this.props.navigation.toggleDrawer()
        }
    }
  

  navLink(nav,text,icon,show=false){
      
          const {topDataCategory } = this.state
            return(
                <Fragment>
                    <TouchableOpacity 
                    style={{height:50,flexDirection:'row'}} 
                    onPress={()=>this.gotToNavLink(nav)}>

                        <View style={{height:50,flexDirection:'row'}}>
                            <Icon style={Styles.icons} name={icon} />
                            <Text style={Styles.link}>{text}</Text>
                        </View>
                        { text ==='Catégories' && (
                        <Icon style={Styles.iconList} 
                        name='list'
                        onPress={()=>this.toggleList() }
                        />)}
                        

                    </TouchableOpacity>
                        { this.state.list && show === true && (
                             <Container style={{}}>
                             <Header style={{height:20,backgroundColor:'#3399ff'}}/>
                             <ScrollView style={{flex:1}}>
                             <Content>
                               <List>
                               { topDataCategory && topDataCategory.map((value,key)=>{
                                           
                                    return (
                                        
                                        <ListItem key={Date.now()+key} onPress={()=> this.goToCategoryPage(value)}>
                                            <Text>{value}</Text>
                                        </ListItem>

                                    )
                                 })}
                               </List>
                             </Content>
                             </ScrollView>
                           </Container>
                        )}
                </Fragment>
            )
    }


 render(){
     const {profileUser,receiveResponseConnection} = this.state
     
     return(
        <AnimatedLinearGradient  customColors={presetColors.backgroundColor} speed={4000}>
         <View style={Styles.container}>
        
             <View style={Styles.topLinks} >
                <View style={Styles.profile}>
                    <View  style={Styles.imgView}>
                        <Image style={Styles.img} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/>
                    </View>
                    <View  style={Styles.profileText}>
                        <Text style={Styles.nameText} >{ profileUser && profileUser}</Text>
                    </View>
                </View>
             </View>
             
             <View style={Styles.bottomLinks}>
                <ScrollView > 
                    {this.navLink('Home','Chat Général','home')}
                    {this.navLink('MyQuestions','Mes questions','chatbubbles')}
                    {this.navLink('Profile','Profil','person')}
                    {this.navLink('Category','Catégories','keypad',true)}  
                </ScrollView>
             </View>
      
        </View>
        </AnimatedLinearGradient>
        
     )
 }
}



