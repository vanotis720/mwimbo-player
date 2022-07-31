/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React, { useContext } from "react";
import { View, Text, Dimensions, ActivityIndicator, FlatList, StatusBar, StyleSheet } from "react-native";
import { AppContext } from "../providers/AppProvider";
import AlbumItem from "./Atoms/AlbumItem";

const { width } = Dimensions.get('window');


function Album({ navigation }) {
    const { albums, isLoading } = useContext(AppContext);

    return (
        <View style={styles.container}>
            <StatusBar />
            {
                isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <View style={styles.topSection}>
                            <Text style={styles.topTitle}>Tous les Artistes </Text>
                            <Text style={styles.topSubtitle}>{albums.length} </Text>
                        </View>
                        <View style={styles.downSection}>
                            <FlatList data={albums} renderItem={({ item }) => (
                                <AlbumItem library={item} />
                            )} />
                        </View>
                    </>
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#280D9F',
    },
    topSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#280D9F',
    },
    topTitle: {
        color: '#FFF',
        fontSize: 30,
        fontWeight: 'bold',
    },
    topSubtitle: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold',
    },
    downSection: {
        flex: 2,
        width: width,
        paddingHorizontal: width * 0.09,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 90,
        paddingVertical: 20,
    },
});


export default Album;