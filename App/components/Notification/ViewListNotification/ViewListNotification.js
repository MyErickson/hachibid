import React from 'react'
import { ScrollView  } from 'react-native'
import { Card, ListItem } from 'react-native-elements'

import { Style } from '../styleNotification'

const  ViewListNotification =({ 
       notificationQuestions,
       goToCategoryPage
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
                      roundAvatar
                      title={item.text}
                      leftIcon={{ name: 'notifications' }}
                      bottomDivider
                      chevron
                      onPress={()=>goToCategoryPage(item)}
                      />
                  );
                  })
              }
          </Card>
          </ScrollView> 
        )
    
}

export default ViewListNotification
