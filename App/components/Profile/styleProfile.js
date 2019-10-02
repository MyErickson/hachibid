import { StyleSheet } from 'react-native';

const marginTop = 20 ; 

export const Style = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:"space-between",
        paddingBottom:20,
        
   
    },
    
    containerInput:{
        borderRadius:10,
        marginBottom:10,
        
    },
    form:{
        width:300,
        height:350 ,
        marginTop:marginTop,
        
    },
    button:{
        width:300,
        marginTop:10,
        justifyContent:"center"
    },
    textRegister:{
        alignItems:"center",
        marginTop:marginTop,
     
       
    },
    header:{
        height:50,
        paddingBottom:25,
       
    },
    avatar:{
        marginTop:30,
        marginLeft:80
    },
    scrollview:{
        marginHorizontal: 0,
        backgroundColor:'white',
    
        
    }
  
    



})