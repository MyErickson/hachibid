import React, { Fragment } from 'react';

import { Platform , Dimensions , StyleSheet , View , Text,TouchableOpacity , Image , ScrollView} from 'react-native';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import { Style } from '../Menu/styleMenu';
import { Icon,Container, Header, Content, List, ListItem, } from 'native-base';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from "react-native-responsive-screen";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
 const presetColors = {
    instagram: [
      'rgb(160, 190, 235)',
      'rgb(14, 65, 144)',
   
    ],
 }

 const casualList=[
    { name:'Simon Mignolet'},
    { name:'Nathaniel Clyne'},
     {name:'Dejan Lovren'},
    { name:'Simon Mignolet'},
     {name:'Nathaniel Clyne'},
     {name:'Dejan Lovren'},
     { name:'Simon Mignolet'},
      {name:'Nathaniel Clyne'},
     ]
export default class MenuDrawer extends React.Component{
     state={
         list:false
     }

     toggleList=()=>{
         const { list } = this.state
            this.setState({list:!list})
     }
      
     dataList =()=>{

            const list = Object.values(casualList).map((value,key)=>{
             
                        return (
                            <Fragment>
                            <ListItem key={key} onPress={()=>console.log('show')}>
                                <Text>{value.name}</Text>
                            </ListItem>
                    </Fragment> 
                        )
            })
            console.log(list)

         return list
     }

    navLink(nav,text,icon,show=false){
            return(
                <Fragment>
                    <TouchableOpacity 
                    style={{height:50,flexDirection:'row'}} 
                    onPress={()=>this.props.navigation.navigate(nav)}>

                        <View style={{height:50,flexDirection:'row'}}>
                            <Icon style={Styles.icon} name={icon} />
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
                               {this.dataList()}
                               </List>
                             </Content>
                             </ScrollView>
                           </Container>
                        )}
                </Fragment>
            )
    }


 render(){
     return(
        <AnimatedLinearGradient  customColors={presetColors.instagram} speed={4000}>
         <View style={Styles.container}>
        
             <View style={Styles.topLinks} >
                <View style={Styles.profile}>
                    <View  style={Styles.imgView}>
                        <Image style={Styles.img} source={{uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'}}/>
                    </View>
                    <View  style={Styles.profileText}>
                        <Text style={Styles.nameText} > Pseudo</Text>
                    </View>
                </View>
             </View>
             
             <View style={Styles.bottomLinks}>
                 {this.navLink('Home','Chat Général','home')}
                 {this.navLink('Home','Mes questions','chatbubbles')}
                 {this.navLink('Profile','Profil','person')}
                 {this.navLink('Home','Catégories','keypad',true)}
               
             </View>
      
        </View>
        </AnimatedLinearGradient>
        
     )
 }
}

const Styles = StyleSheet.create({
    container:{
        flex:1,
      
    },
    topLinks:{
        height:160,
       
    },
    bottomLinks:{
       flex:1,
        backgroundColor:'white',
        paddingTop:10,
        height:hp('100%'),
    },
    link:{
        
        fontSize:20,
        padding:6,
        paddingLeft:14,
        margin:5,
        textAlign:'left'
    },
    icon:{
    
        padding:6,
        paddingLeft:25,
        margin:5,
    },
    iconList:{
        padding:6,
        paddingLeft:60,
        margin:5,
    },
    profile:{
        flex:1,

        alignItems: 'center',
        borderBottomWidth:1,
        borderBottomColor:'#777777',
    },
    imgView:{
        flex:1,
        justifyContent:'center'
    },
    img:{
        height:95,
        width:95,
        borderRadius:50
    },
    profileText:{
        paddingBottom:20
    },
    nameText:{
        color:'white',
        fontSize:20 ,
         fontWeight:'bold'
    }
})


