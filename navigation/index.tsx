import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Restaurants from '../screens/Restaurants';
import Favorites from '../screens/Favorites';
import { RootStackParamList, RootTabParamList } from '../types';

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Root" component={BottomTabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Restaurants"
    >
      <BottomTab.Screen
        name="Restaurants"
        component={Restaurants}
        options={{
          title: "Restaurants",
          tabBarIcon: ({ color }) => <TabBarIcon name="building" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} {...props} />;
}
