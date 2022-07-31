/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Album from '../components/Album';
import Artist from '../components/Artists';
import Home from '../components/Home';
import Playlist from '../components/Playlist';
import Songs from '../components/Songs';

const Tab = createBottomTabNavigator();

function AppBottomNavigation() {
    return (
        <Tab.Navigator
            initialRouteName="Accueil"
            screenOptions={{
                activeTintColor: '#280D9F',
            }}
        >
            <Tab.Screen
                name="Ma musiques"
                component={Songs}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="music" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name="Artistes"
                component={Artist}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name="Accueil"
                component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name="Albums"
                component={Album}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="album" color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen
                name="Playlists"
                component={Playlist}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="playlist-music" color={color} size={26} />
                    )
                }}
            />
        </Tab.Navigator>
    );
}

export default AppBottomNavigation;