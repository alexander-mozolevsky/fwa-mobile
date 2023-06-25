import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeScreen} from './screens/Home';
import {RecommendationsScreen} from './screens/Recommendations';
import {UsersFormScreen} from './screens/UsersForm';

import {APP_ROUTES} from './constants/routes';
import {LogBox} from 'react-native';

export type RootStackParamList = {
  [APP_ROUTES.HOME]: {};
  [APP_ROUTES.USER_FORM]: {};
  [APP_ROUTES.RECOMMENDATIONS]: {};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

LogBox.ignoreAllLogs();

export const App = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName={APP_ROUTES.HOME}>
      <Stack.Screen
        name={APP_ROUTES.HOME}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={APP_ROUTES.RECOMMENDATIONS}
        component={RecommendationsScreen}
        options={{
          headerTitle: 'Recommendations',
          headerStyle: {
            backgroundColor: 'rgb(230, 223, 246)',
          },
        }}
      />
      <Stack.Screen
        name={APP_ROUTES.USER_FORM}
        component={UsersFormScreen}
        options={{
          headerTitle: 'User creation form',
          headerStyle: {
            backgroundColor: 'rgb(230, 223, 246)',
          },
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
