import { StyleSheet } from 'react-native';

const marginTop = 20 ; 

export const Style = StyleSheet.create({
    container:{
      
        maxHeight:250,
        flexDirection:'column',
        padding:13,
        backgroundColor:'white',
        borderRadius:20


    },
    
    containerInput:{
        borderRadius:10,
        margin:10,
        
    },
    form:{
        width:300,
        marginTop:marginTop
        
    },
    button:{
        width:80,
        marginTop:40,
        margin:10,
        justifyContent:"center",
      
   
    },
  
    textRegister:{
        alignItems:"center",
        marginTop:marginTop,
     
       
    },
    containerButton:{
        flexDirection:'row',
        justifyContent:'flex-end'
   
    },
    text:{
        fontSize:20,
    }
    



})