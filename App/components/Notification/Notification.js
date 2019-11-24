import React, { Component } from 'react';
import { View,  Text } from 'react-native';
import { Tab, Tabs, TabHeading, Icon,} from 'native-base';
import ViewListNotification from './ViewListNotification/ViewListNotification'
import Menu from '../Menu/Menu';
import { Style } from './styleNotification';

class Notification extends Component {

    state = {
      notificationQuestions :undefined
    }
  
    async componentDidMount(){
       const { notificationPrecision , receiveResponseConnection} = this.props
      notificationPrecision(receiveResponseConnection)
    }
  static getDerivedStateFromProps(props,state){ 
    
      const { notificationQuestions } = props
      if(notificationQuestions){
        const notif = notificationQuestions.filter((value) => value.question === undefined)
       
        state.notificationQuestions = notif
      }
   
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
    const dataMessageCurrent = new Object
    dataMessageCurrent.idAnwsersUser = value.user._id
    dataMessageCurrent.idMessage= value.idMessage

    this.props.navigation.navigate('MyQuestions',{
        answerCurrent:value.text,
        navigation:this.props.navigation,
        showAboveInput:true,
        dataMessageCurrent
    })
 }

  render() {
     const { notificationQuestions } =this.state
   
    return (
      <View style={{flex:1}}>
        <Menu nameMenu="Notification" navigation={this.props.navigation} />
        <Tabs
         textStyle={{coloe:"white"}}
        >
            <Tab 
             heading={ 
             <TabHeading style={{backgroundColor:"#34A1DC"}} >
               <Text style={{color:"white"}}>Questions</Text>
              </TabHeading>
             }> 

               <ViewListNotification 
               notificationQuestions={notificationQuestions}
               goToCategoryPage={this.goToCategoryPage}
               />

            </Tab>

            <Tab heading={ 
              <TabHeading style={{backgroundColor:"#34A1DC"}} >
                <Text style={{color:"white"}}>Précisions</Text>
              </TabHeading>
             }>

                <ViewListNotification 
                  notificationQuestions={notificationQuestions}
                  goToCategoryPage={this.goToCategoryPage}
                  />

            </Tab>
           
        </Tabs>
    
      </View>
    );
  }
}

export default Notification;
