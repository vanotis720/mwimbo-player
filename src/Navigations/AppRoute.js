/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { AppContext } from '../providers/AppProvider';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import AppBottomNavigation from './AppBottomNavigation';

const AppRoute = () => {
    const { isLoading } = useContext(AppContext);
    return (
        isLoading ? (
            <View style={styles.container} >
                <ActivityIndicator size="large" color="#1F2128" />
            </View >
        ) : (
            <NavigationContainer>
                <AppBottomNavigation />
            </NavigationContainer>
        )
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1F2128',
    },
});

export default AppRoute;
