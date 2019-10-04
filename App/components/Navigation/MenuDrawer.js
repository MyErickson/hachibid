import React, { Fragment } from 'react';

import { Platform , Dimensions , StyleSheet , View , Text,TouchableOpacity , Image , ScrollView} from 'react-native';
import AnimatedLinearGradient from 'react-native-animated-linear-gradient';
import { Styles } from './styleMenuDrawer';
import { Icon,Container, Header, Content, List, ListItem, } from 'native-base';
import { casualList} from '../../data/dataCasual'

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
 const presetColors = {
    instagram: [
      'rgb(160, 190, 235)',
      'rgb(14, 65, 144)',
   
    ],
 }


export default class MenuDrawer extends React.Component{
     state={
         list:false,
         dataCategory:undefined,
     }


    async componentDidMount(){
         
        //  await this.props.receiveDataCategory()
        //  const dataCategory = await this.props.dataCategory

        //  this.setState({dataCategory})

     }
    

     toggleList=()=>{
         const { list } = this.state
            this.setState({list:!list})
     }
      


  navLink(nav,text,icon,show=false){
      

            return(
                <Fragment>
                    <TouchableOpacity 
                    style={{height:50,flexDirection:'row'}} 
                    onPress={()=>this.props.navigation.navigate(nav)}>

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
                               { casualList.map((value)=>{
                                           
                                    return (
                                        
                                        <ListItem key={Date.now()} onPress={()=>console.log('show')}>
                                            <Text>{value.name}</Text>
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
                 {this.navLink('MyQuestions','Mes questions','chatbubbles')}
                 {this.navLink('Profile','Profil','person')}
                 {this.navLink('Home','Catégories','keypad',true)}  
             </View>
      
        </View>
        </AnimatedLinearGradient>
        
     )
 }
}



