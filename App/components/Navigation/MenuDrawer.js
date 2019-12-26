import React, { Fragment } from 'react';

import {  View , Text,TouchableOpacity , Image , ScrollView} from 'react-native';

import { Styles } from './styleMenuDrawer';
import { Icon,Container, Header, Content, List, ListItem, } from 'native-base';

import {  SafeAreaView } from 'react-navigation';



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
         this.props.dataFilterMessagesCategory()
         this.props.dataMessagesCategory()
        const { receiveResponseConnection }=this.state
        await this.props.dataAllCategory(receiveResponseConnection)

         var data = new Object
         data.token = receiveResponseConnection
         data.id = value.id
 
        this.props.receiveDataMessagesCategory(data)

        this.props.navigation.navigate('MessageCategory',{
            nameCategory:value.title,
            navigation:this.props.navigation,
            id:value.id
        })
     }


    gotToNavLink=async (nav)=>{
        const { dataFilterMessagesCategory,
            DataMessagesMyQuestions,
            dataAllCategory,
            receiveDataMessagesMyQuestions,
            receiveDatafilterMessageMyQuestion,
            navigation
        } = this.props
         dataFilterMessagesCategory()
         DataMessagesMyQuestions()
 
        console.log(nav)
        const { receiveResponseConnection , profileUser }=this.state

        dataAllCategory(receiveResponseConnection)
        var data = new Object
        data.token = receiveResponseConnection
        data.idUser = profileUser.id

       receiveDataMessagesMyQuestions(data)
       if(nav === 'MyQuestions' || nav === 'Home'){
          
        receiveDatafilterMessageMyQuestion()
    }

        if(nav === 'Category'){
            navigation.navigate(nav,{
                nameCategory:nav
            })
            navigation.closeDrawer()
        }else{
           navigation.navigate(nav)
           navigation.closeDrawer()
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
                             <Container style={Styles.list}>
                             <View style={{height:20,backgroundColor:'#3399ff'}}/>
                             <ScrollView style={{flex:1}}
                                showsVerticalScrollIndicator={false}
                                keyboardShouldPersistTaps="always"
                             >
                             <Content>
                               <List style={{paddingRight:15}}>
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
  
            <SafeAreaView style={Styles.container}>
        
            
                <View style={Styles.topLinks} >
                    <View style={Styles.profile}>
                     
                        <View  style={Styles.profileText}>
                            <Text style={Styles.nameText} >{ profileUser && profileUser.username}</Text>
                           
                        </View>
                    </View>
                    <View style={{height:2,backgroundColor:'white'}}/>
                </View>
                
                <View style={Styles.bottomLinks}>
           

                        {profileUser && profileUser.roleTitle === "Utilisateur" && this.navLink('Home','Chat Général','home') }
                        {profileUser && profileUser.roleTitle === "Utilisateur" ? this.navLink('MyQuestions','Mes questions','chatbubbles') :this.navLink('MyQuestions','Chat Général','home') }
                        {this.navLink('Profile','Profil','person')}
                        {this.navLink('Category','Catégories','keypad',true)}  
           
                </View>
                
        
        </SafeAreaView>

        
     )
 }
}



