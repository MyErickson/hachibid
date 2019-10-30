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
            state.profileUser = dataProfileUser.data
           
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
      
     goToCategoryPage=async(value)=>{

        const { receiveResponseConnection }=this.state
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
                        <Text style={Styles.iconList} 
                        
                        onPress={()=>this.toggleList() }
                        >{`>`}</Text>)}
                        

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
                                            <Text>{value.title}</Text>
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
     const {profileUser} = this.state

     return(
        <AnimatedLinearGradient  customColors={presetColors.backgroundColor} speed={4000}>
         <View style={Styles.container}>
        
             <View style={Styles.topLinks} >
                <View style={Styles.profile}>
                    <View  style={Styles.imgView}>
                        <Image style={Styles.img} source={profileUser && profileUser.image ?{uri: profileUser.image}:{uri:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/>
                    </View>
                    <View  style={Styles.profileText}>
                        <Text style={Styles.nameText} >{ profileUser && profileUser.username}</Text>
                    </View>
                </View>
             </View>
             
             <View style={Styles.bottomLinks}>
                <ScrollView > 

                    {profileUser && profileUser.roleTitle === "Utilisateur" && this.navLink('Home','Chat Général','home') }
                    {profileUser && profileUser.roleTitle === "Utilisateur" ? this.navLink('MyQuestions','Mes questions','chatbubbles') :this.navLink('MyQuestions','Chat Général','home') }
                    {this.navLink('Profile','Profil','person')}
                    {this.navLink('Category','Catégories','keypad',true)}  
                </ScrollView>
             </View>
      
        </View>
        </AnimatedLinearGradient>
        
     )
 }
}



