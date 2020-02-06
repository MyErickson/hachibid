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
        idMessage:undefined,
        valid:undefined

    }

    openAlert =(idMessage,valid)=>{
        if(valid){
            this.setState({
                alertVisible:true,
                messageAlert:"Voulez-vous approuver cette question ? ",
                confirmValid:false,
                valid,
                idMessage
            })
        }else{
            this.setState({
                alertVisible:true,
                messageAlert:"Voulez-vous désapprouver cette question ?(un message automatique sera envoyé à l'utilisateur pour le prévenir ) ",
                confirmValid:false,
                valid,
                idMessage
            })
        }
      
    }

     closeAlert=()=>{
         this.setState({
             alertVisible:false,
             confirmValid:false,
             idMessage:undefined
             
         })
     }

     yesConfirm=()=>{
  
        const { valid} = this.state
        if(valid){
            this.setState({
                confirmValid:true
            })
         
        }else{
            this.validConfirm()
        }
       

 
     }
     
     validConfirm=(idCategory)=>{
     console.log("TCL: ViewQuestion -> validConfirm -> idCategory", idCategory)

        const { idMessage ,valid} = this.state
        const {   profileUser,token ,GetQuestionNoValid} =this.props

        axios.defaults.baseURL = 'https://rabbin-dev.digitalcube.fr'
        axios.defaults.headers['Authorization']= "Bearer "+token;

        axios.put(idMessage,
            {
                category:valid? `/api/categories/${idCategory}`:null,
                valid: valid ? true : false,
                seen: true,
                // answers:[]
            }
        ).then((response)=>{
            console.log("TCL: requestGetQuestionNoValid -> response", response)
     
            axios.post('/api/answers',{
                content: valid ? "" : `Votre question n'a pas été approuvé pour l'une de ces raisons :${"\n"} - Une question simulaire a déja été répondu ${"\n"} - Votre question est inapproprié`,
                answerer: profileUser && profileUser["@id"],
                answered: valid? false :true,
                message: idMessage,
                seen: valid? false :true,
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
                                <Card containerStyle={[{padding: 0}, seen && { backgroundColor:"#E49F9F"}]} >
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
                                                onPress={()=>this.openAlert(_id,true)}
                                                title= 'oui'
                                            
                                            />
                                             <Button 
                                                buttonStyle={[Style.button,{backgroundColor:"#F22929"}]}
                                                title= 'non'
                                                onPress = {()=>this.openAlert(_id,false)}
                                            
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
