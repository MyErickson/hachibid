import React, { Fragment } from 'react'
import { ScrollView,View,Text  } from 'react-native'
import { Card, ListItem } from 'react-native-elements'

import { Style } from '../styleNotification'
import {
  widthPercentageToDP as wp,

} from "react-native-responsive-screen";

const  ViewListNotification =({ 
       notification,
       goToCategoryPage,
       requete,
       icon,
       profileUser
     
})=> {
            
  const modif = (value)=>{
    return value < 10 ?"0" + value  : value
  }
        return (
          <ScrollView
            bounces={true}
            style={Style.scrollview}
            showsVerticalScrollIndicator={false}
            
            
            >
              <Card containerStyle={{padding: 0}} >
              {
                  notification&& notification.map((item, i) => {
                    const { user , userAnswerer, createdAt, text, seen ,audio,question,precision} = item
                    const date = new Date(createdAt)

                    const hours = date.getHours()
                    const modifHours = modif(hours)

                    const minutes = date.getMinutes()
                    const modifMinutes  = modif(minutes)

                    const showTime = modifHours+ ":"+modifMinutes

                    const month = date.getUTCMonth()
                    const modifMonth = month  < 10 ?"0" + (month  +1) : month 
                    
                    const showDate = date.getDate() +"/"+ modifMonth +"/"+date.getFullYear()
                  return (
                      <ListItem
                      key={i}
                      rightSubtitleProps={{backgroundColor:"black"}}
                      contentContainerStyle={{borderRadius:15,backgroundColor:"#8ECCE7",padding:10}}
                      pad={5}
                      roundAvatar
                      title={
                        question || precision?
                        <View style={Style.containerTitle}>
                          <View style={profileUser === "user" ? [Style.title] : [Style.title]}>
                            <Text>{question ? question.text:precision}</Text>
                          </View>
                        </View>:profileUser ==="admin" &&( !audio  ?
                          <ScrollView style={{maxHeight:92, margin:5}}
                          showsVerticalScrollIndicator={false}
                          keyboardShouldPersistTaps="always"
                          >
                            <Text>{text.length > 100 ?`${text.slice(0,90)}...`:text}</Text>
                          </ScrollView>
                          :(<Text style={{margin:5}}>Vous avez reçu un message vocal</Text>))
                      }


                      containerStyle={seen ? {backgroundColor:"white"}:{backgroundColor:"#D7DCE1"}}
                      chevron={user?<Text style={{fontSize:15,fontWeight:"bold"}}>></Text>:false}
                      leftIcon={{ name: `${audio?"voicemail":icon}` }}


                      subtitle= {
                        <View style={{backgroundColor:"#8ECCE7"}}>
                          {profileUser === "user"  && ( !audio ?
                          <ScrollView style={{maxHeight:92,margin:5}}
                          showsVerticalScrollIndicator={false}
                          keyboardShouldPersistTaps="always"
                          >
                            <Text>{ text.length > 100 ?`${text.slice(0,90)}...`:text}</Text>
                          </ScrollView>
                          : (<Text style={{padding:5}}>Vous avez reçu un message vocal</Text>) ) }

                          { precision && 
                          <ScrollView style={{maxHeight:92,margin:5}}
                          showsVerticalScrollIndicator={false}
                          keyboardShouldPersistTaps="always"
                          >
                            <Text>{text && text.length > 100 ?`${text.slice(0,90)}...`:text}</Text>
                          </ScrollView>}

                          <View style={{flexDirection:'row',justifyContent:"space-between",}}>
                            <Text style={{color:"#009938"}}>{user?user.name :userAnswerer.name }</Text>
                            <Text style={{color:"white"}}>{showTime }</Text>
                            <Text style={{color:"white"}}>{showDate }</Text>
                          </View> 
                        </View>}
                    
                      bottomDivider
               
                      onPress={()=>goToCategoryPage(item,requete)}
                      />
                  );
                  })
              }
          </Card>
          </ScrollView> 
        )
    
}

export default ViewListNotification
