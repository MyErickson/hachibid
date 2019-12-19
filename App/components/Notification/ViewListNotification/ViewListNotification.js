import React from 'react'
import { ScrollView,View,Text  } from 'react-native'
import { Card, ListItem } from 'react-native-elements'

import { Style } from '../styleNotification'


const  ViewListNotification =({ 
       notification,
       goToCategoryPage,
       requete,
       icon
     
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
                    const { user , userAnswerer, createdAt, text , seen ,audio} = item
                  return (
                      <ListItem
                      key={i}
                      rightSubtitleProps={{backgroundColor:"black"}}
                      contentContainerStyle={{borderRadius:15,backgroundColor:"#8ECCE7",padding:10}}
                      pad={5}
                      roundAvatar
                      subtitle= {
                      <View style={{flexDirection:'row',justifyContent:"space-between",}}>
                        <Text style={{color:"#009938"}}>{user?user.name :userAnswerer.name }</Text>
                        <Text style={{color:"white"}}>{`${createdAt.getDate()}.${createdAt.getMonth()}.${createdAt.getFullYear()}`}</Text>
                      </View>}
                      containerStyle={seen ? {backgroundColor:"#D7DCE1"}:{backgroundColor:"white"}}
                      title={
                        !audio ?
                        <ScrollView style={{maxHeight:51}}
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="always"
                        >
                          <Text>{user && text.length > 100 ?`${text.slice(0,100)}...`:text}</Text>
                        </ScrollView>
                        : <Text>Vous avez reçu un message vocal</Text>
                      }
                      leftIcon={{ name: `${audio?"voicemail":icon}` }}
                      
                      chevron={user?<Text style={{fontSize:15,fontWeight:"bold"}}>></Text>:false}
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
