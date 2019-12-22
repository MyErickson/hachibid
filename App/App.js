// if(__DEV__) {
//     import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
//   }
import React, { Component } from 'react';

import { createAppContainer , createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from "react-redux";
import store from './store/';
import DrawerNavigator from './components/Navigation/DrawerNavigator';
import Register from './components/Register/Register';
import ResetPasswordContainer from './containers/ResetPassword/ResetPassword';
import ConnectionContainer from './containers/Connection/Connection';
import AlertDialog from './components/AlertDialog/AlertDialog';
import Welcome from './components/Welcome/Welcome'
import NetInfo from "@react-native-community/netinfo";
  
var timerNetwork
class App extends Component {

    state = { 
      isModalVisible:false,
      alertVisible:false,
      style:false,
      messageAlert:undefined,
  };
   


  async  componentDidMount(){
      let isInternetReachable 
      let isConnected  

      timerNetwork =  setInterval(async()=>{
      
        await NetInfo.fetch().then(state => {
          isInternetReachable = state.isInternetReachable
          isConnected  = state.isConnected 

        })
        if(isConnected && isInternetReachable){
        
          this.setState({
            alertVisible:false,
            style:false,
            messageAlert:undefined
          }) 
        } else{
  
       
          this.setState({
            alertVisible:true,
            style:false,
            messageAlert:`Aucun reseau mobile ou wifi detecté`
          }) 
        }

        },2000)
 
    }
     
    closeAlert=()=>{
      this.setState({alertVisible:false})  
    }

    
    componentWillUnmount(){

      clearInterval(timerNetwork)
     }

    render() {
      const {messageAlert,alertVisible,style} =this.state
        return (
            <Provider store={store}>
                <Routes hideStatusBar/>
                 <AlertDialog
                alertVisible={alertVisible}
                closeAlert={this.closeAlert}
                messageAlert={messageAlert}
                noTextClose={false}
                style={style}
                />
            </Provider>
        );
    }
}

export default App;

/**
 * The root screen contains the application's navigation.
 *
 * @see https://reactnavigation.org/docs/en/hello-react-navigation.html#creating-a-stack-navigator
 */
const StackNavigator = createStackNavigator(
    {
      // Create the application routes here (the key is the route name, the value is the target screen)
      // See https://reactnavigation.org/docs/en/stack-navigator.html#routeconfigs
      Welcome:Welcome,
      Connection:ConnectionContainer,
      Register: Register,
      ResetPassword:ResetPasswordContainer,
     
 

      // The main application screen is our "ExampleScreen". Feel free to replace it with your
      // own screen and remove the example.
      
    },
    {
      // By default the application will show the splash screen
      initialRouteName: 'Welcome',
      // See https://reactnavigation.org/docs/en/stack-navigator.html#stacknavigatorconfig
      headerMode: 'none',
    }
  )
  
  const AppNavigator = createSwitchNavigator({
   
    App: {
      screen: StackNavigator,
    },
    drawer: {
        screen: DrawerNavigator,
      }, 
   
  });


  const Routes = createAppContainer(AppNavigator)


