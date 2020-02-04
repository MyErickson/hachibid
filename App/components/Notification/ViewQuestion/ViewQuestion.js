import React,{Component} from 'react'
import { View, Text ,ScrollView , } from 'react-native'
import { Card, ListItem,Button } from 'react-native-elements'
import { Style } from '../styleNotification'
import { dateTime } from "../../../store/actionRequetes/actionRequetes"
import AlertNotificationContainer from "../../../containers/AlertNotification/AlertNotification"
import axios from 'axios';

class ViewQuestion extends Component {

    state={
        alertVisible:false,
        confirmValid:false,
        idMessage:undefined

    }

    openAlert =(idMessage)=>{
        this.setState({
            alertVisible:true,
            messageAlert:"Voulez-vous approuver cette question ? ",
            confirmValid:false,
            idMessage
        })
    }

     closeAlert=()=>{
         this.setState({
             alertVisible:false,
             confirmValid:false,
             idMessage:undefined
             
         })
     }

     yesConfirm=()=>{
        this.setState({
            confirmValid:true
        })
     

 
     }
     
     validConfirm=(idCategory)=>{

        const { idMessage } = this.state
        const {   profileUser,token ,GetQuestionNoValid} =this.props
        console.log("TCL: ViewQuestion -> yesConfirm -> rofileUser", idCategory)

        axios.defaults.baseURL = 'https://rabbin-dev.digitalcube.fr'
        axios.defaults.headers['Authorization']= "Bearer "+token;
     
        axios.put(idMessage,
            {
                category: `/api/categories/${idCategory}`,
                valid: true,
                seen: true
            }
        ).then((response)=>{
        console.log("TCL: requestGetQuestionNoValid -> response", response)
     
        axios.post('/api/answers',{
            content: "",
            answerer: profileUser && profileUser["@id"],
            answered: false,
            message: idMessage,
            seen: false,
            audio: null
        }).then((response)=>{
        console.log("TCL: ViewQuestion -> yesConfirm -> response", response)
        this.closeAlert()
        GetQuestionNoValid(token)

        }).catch((err)=>{
        console.log("TCL: ViewQuestion -> yesConfirm -> err", err)
            
        })
    
            
     
    
            
        }).catch((err)=>{
            console.log("axios ",err)
            
        })
     }
    render (){



        const {
            questionNoValid,
            goToCategoryPage,
            requete,
        } = this.props

        const { alertVisible , messageAlert , confirmValid } = this.state

        return (
            <ScrollView
            bounces={true}
            style={Style.scrollview}
            showsVerticalScrollIndicator={false}
            
            
            >
                
                    {
                        questionNoValid && questionNoValid.map((item, i) => {
                            const { user ,  createdAt, text, seen , _id } = item
                       
                    
                            
                            const date = new Date(createdAt)
                            const data = dateTime(date)
                                return(
                                <Card containerStyle={{padding: 0}} >
                                    <View style={{flexDirection:"row",padding:10}} onPress={()=>goToCategoryPage(item,requete)}>
                                        <View style={{borderRadius:15,backgroundColor:"#8ECCE7",padding:10,width:"80%"}}>
                                            <View style={{flex:1}}>
                                                <Text>{text}</Text>
                                            </View>
                                            <View style={{flexDirection:'row',justifyContent:"space-between",}}>
                                                <Text style={{color:"#009938"}}>{user && user?user.name :userAnswerer.name }</Text>
                                                <Text style={{color:"white"}}>{data.showTime }</Text>
                                                <Text style={{color:"white"}}>{data.showDate }</Text>
                                            </View> 
                
                                            
                                        </View>
                                        <View style={{flex:1,justifyContent: 'center',paddingLeft:5}}>
                                            <Text style={{textAlign:"center",fontWeight:"bold"}}>Valider</Text>
                                            <Button 
                                                containerStyle={ {marginVertical:5}}
                                                buttonStyle={[Style.button,{backgroundColor:'rgba(41,113,232,0.8)'}]}
                                                onPress={()=>this.openAlert(_id)}
                                                title= 'oui'
                                            
                                            />
                                             <Button 
                                                buttonStyle={[Style.button,{backgroundColor:"#F22929"}]}
                                                title= 'non'
                                                onPress = {()=>this.closeAlert()}
                                            
                                            />
                                        </View>
                                    
                                    </View>
                                </Card>
                        )
                    
                })
                }
                <AlertNotificationContainer
                    closeAlert={this.closeAlert}
                    alertVisible={ alertVisible}
                    messageAlert ={ messageAlert}
                    yesConfirm = {this.yesConfirm}
                    confirmValid={confirmValid}
                    validConfirm={this.validConfirm}
                />
             </ScrollView> 
        )
    }
}

export default ViewQuestion
