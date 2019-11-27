import React from 'react'
import { ScrollView,View,Text  } from 'react-native'
import { Card, ListItem } from 'react-native-elements'

import { Style } from '../styleNotification'

const  ViewListNotification =({ 
       notificationQuestions,
       goToCategoryPage,
       requete
})=> {
  
        return (
          <ScrollView
            bounces={true}
            style={Style.scrollview}
            showsVerticalScrollIndicator={false}
            
            >
              <Card containerStyle={{padding: 0}} >
              {
                  notificationQuestions&& notificationQuestions.map((item, i) => {
                  return (
                      <ListItem
                      key={i}
                      rightSubtitleProps={{backgroundColor:"black"}}
                      contentContainerStyle={{borderRadius:15,backgroundColor:"#8ECCE7",padding:10}}
                      pad={10}
                      subtitleStyle={{color:"green"}}
                      roundAvatar
                      subtitle= {
                      <View style={{flexDirection:'row',justifyContent:"space-between",}}>
                        <Text style={{color:"green"}}>{item.user.name}</Text>
                        <Text style={{color:"white"}}>{`${item.createdAt.getDate()}.${item.createdAt.getMonth()}.${item.createdAt.getFullYear()}`}</Text>
                      </View>}
                      containerStyle={item.seen ? {backgroundColor:"#D7DCE1"}:{backgroundColor:"white"}}
                      title={item.text}
                      leftIcon={{ name: 'notifications' }}
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
