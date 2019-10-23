import React, { Component } from 'react';

import { createAppContainer , createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Provider } from "react-redux";
import store from './store/';
import DrawerNavigator from './components/Navigation/DrawerNavigator';
import Register from './components/Register/Register';
import ResetPasswordContainer from './containers/ResetPassword/ResetPassword';
import ConnectionContainer from './containers/Connection/Connection';



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return (
            <Provider store={store}>
                <Routes hideStatusBar/>
               
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
      Connection:ConnectionContainer,
      Register: Register,
      ResetPassword:ResetPasswordContainer,
   
 

      // The main application screen is our "ExampleScreen". Feel free to replace it with your
      // own screen and remove the example.
      
    },
    {
      // By default the application will show the splash screen
      initialRouteName: 'Connection',
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