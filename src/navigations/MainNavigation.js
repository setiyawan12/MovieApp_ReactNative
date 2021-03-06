import React from 'react';
import HomeScreen from "../screens/Home";
import FavoritScreen from "../screens/Favorit";
import AccountScreen from "../screens/Account";
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator()

const MainNavigation =()=>{
    return(
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen}/>
                <Tab.Screen name="Favorit" component={FavoritScreen}/>
                <Tab.Screen name="Account" component={AccountScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )

}

export default MainNavigation