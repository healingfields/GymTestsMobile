import React from 'react';
import Login from './screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        component={Login}
        name='login'
        options={{title:'login'}}
        />
        <Stack.Screen 
        component={Home}
        name='home'
        options={{title:'home'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  )
}

export default App;
 