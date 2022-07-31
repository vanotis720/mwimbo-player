/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React, { useContext } from "react";
import { View, Text, Dimensions, ActivityIndicator, FlatList, StatusBar, StyleSheet } from "react-native";
import { AppContext } from '../providers/AppProvider';
import ArtistItem from "./Atoms/ArtistItem";

const { width } = Dimensions.get('window');


function Artist({ navigation }) {
    const { artists, isLoading } = useContext(AppContext);

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
                            <Text style={styles.topSubtitle}>{artists.length} </Text>
                        </View>
                        <View style={styles.downSection}>
                            <FlatList data={artists} renderItem={({ item }) => (
                                <ArtistItem author={item} />
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


export default Artist;