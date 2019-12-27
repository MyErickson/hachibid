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

        return (
          <ScrollView
            bounces={true}
            style={Style.scrollview}
            showsVerticalScrollIndicator={false}
            
            
            >
              <Card containerStyle={{padding: 0}} >
              {
                  notification&& notification.map((item, i) => {
                    const { user , userAnswerer, createdAt, text , seen ,audio,question,precision} = item
                  return (
                      <ListItem
                      key={i}
                      rightSubtitleProps={{backgroundColor:"black"}}
                      contentContainerStyle={{borderRadius:15,backgroundColor:"#8ECCE7",padding:10}}
                      pad={5}
                      roundAvatar
                      title={
                        question || precision?
                        <View style={{flexDirection:"row",marginLeft:0,paddingLeft:0}}>
                          <View style={profileUser === "user" ? [Style.title,{ width:wp("65%")}] : [Style.title,{ width:wp("70%")}]}>
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
                      containerStyle={seen ? {backgroundColor:"#D7DCE1"}:{backgroundColor:"white"}}
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

                          { precision && <ScrollView style={{maxHeight:92,margin:5}}
                          showsVerticalScrollIndicator={false}
                          keyboardShouldPersistTaps="always"
                          >
                            <Text>{  text.length > 100 ?`${text.slice(0,90)}...`:text}</Text>
                          </ScrollView>}

                          <View style={{flexDirection:'row',justifyContent:"space-between",}}>
                            <Text style={{color:"#009938"}}>{user?user.name :userAnswerer.name }</Text>
                            <Text style={{color:"white"}}>{`${createdAt.getDate()}.${createdAt.getMonth()}.${createdAt.getFullYear()}`}</Text>
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
