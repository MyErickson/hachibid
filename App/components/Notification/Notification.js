import React, { Component, Fragment } from 'react';
import { View,  Text } from 'react-native';
import { Tab, Tabs, TabHeading, Icon,} from 'native-base';
import ViewListNotification from './ViewListNotification/ViewListNotification'
import Menu from '../../containers/Menu/Menu'
import { Style } from './styleNotification';
import axios from 'axios';


var timer;


class Notification extends Component {

    state = {
      notificationQuestions :undefined,
      profileUser:undefined,
      notificationPrecision:undefined,
      notificationAnswerUser:undefined
    }
  
    async componentDidMount(){
       const { notificationPrecision , receiveResponseConnection} = this.props
      notificationPrecision(receiveResponseConnection)
    }



  static getDerivedStateFromProps(props,state){ 
     
      const { notificationQuestions ,dataProfileUser,allPrecision , answerUser } = props
      if(notificationQuestions){
  
        
        const notif = notificationQuestions.filter((value) => value.question === undefined)
      
        state.notificationQuestions = notif
       
      }

      if(dataProfileUser ){
        state.profileUser = dataProfileUser.data
      }

      if(allPrecision){
        state.notificationPrecision = allPrecision
      }

      if(answerUser){

        state.notificationAnswerUser = answerUser
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



  goToCategoryPage=(value,requete)=>{
  
    const { profileUser } = this.state
    console.log("value de got to page",profileUser)
    const data = new Object
    data._id = value._id
    data.idUser= profileUser.id
    data.text=value.text
    data.role= "ROLE_ADMIN"
    data.token= this.props.receiveResponseConnection
 
    axios.defaults.headers['Authorization']= "Bearer "+data.token;
    axios.put(`https://rabbin-dev.digitalcube.fr${data._id}`,
            {
            seen:true
          }    
    ).then((res)=>{
      console.log("response vaut ",res)
    }).catch((err)=>{
      console.log("error vaut ",err.response)
    })
    

    if(requete !== "answers"){
      this.props.navigation.navigate('MyQuestions')
      this.props.sendDataFilterHomeMessage(data)
    }

 
 }
    toggleModal=(props)=>{
      clearInterval(timer) 
      const { isModalVisible } = this.state
      this.setState({isModalVisible: !isModalVisible,
                    propsSounder:props,
                    play:false ,
                    currentPositionSec:0
      })
    }

    showAlertDialog = ()=>{
      this.setState({
        alertVisible:true,
        alertText:"Etes sur de vouloir enregistrer un message vocal ?",
        alertConfirm:true,
        style:true
      })
    }
    
    closeAlert=()=>{
      this.setState({
        alertVisible:false,
        alertText:"",
        alertConfirm:false,
        style:false
      })
    }

  render() {
     const { notificationQuestions ,profileUser,notificationPrecision,notificationAnswerUser } =this.state
    
    return (
      <View style={{flex:1}}>
        <Menu nameMenu="Notification" navigation={this.props.navigation} />
        { profileUser  && profileUser .roles[0] !== "ROLE_USER" ?
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
                notification={notificationQuestions}
                goToCategoryPage={this.goToCategoryPage}
                requete="messages"
                />

              </Tab>
      
              <Tab heading={ 
                <TabHeading style={{backgroundColor:"#34A1DC"}} >
                  <Text style={{color:"white"}}>Précisions</Text>
                </TabHeading>
              }>

                  <ViewListNotification 
                    notification={notificationPrecision}
                    goToCategoryPage={this.goToCategoryPage}
                    requete="precision"
                    />

          </Tab>
          </Tabs>
       :  
       <Tabs
       textStyle={{coloe:"white"}}
      >
          <Tab heading={ 
          <TabHeading style={{backgroundColor:"#34A1DC"}} >
            <Text style={{color:"white"}}>Mes réponses</Text>
          </TabHeading>
        }>
        <ViewListNotification 
          notification={notificationAnswerUser}
          goToCategoryPage={this.goToCategoryPage}
          requete="answers"
          />
          </Tab>
          
        </Tabs>
        }    


    
      </View>
    );
  }
}

export default Notification;
