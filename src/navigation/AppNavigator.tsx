import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ListScreen from '../screens/ListScreen';
import ListItemScreen from '../screens/ListItemScreen';
import {ScreenNames} from '../constants/screenNames';

export type RootStackParamList = {
  [ScreenNames.List]: undefined;
  [ScreenNames.ListItem]: {id: number; title: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ScreenNames.List}
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name={ScreenNames.List}
          component={ListScreen}
          options={{title: 'Articles'}}
        />
        <Stack.Screen
          name={ScreenNames.ListItem}
          component={ListItemScreen}
          options={{title: 'Article Details'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
