/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import {
    View,
    StatusBar,
    Text,
    StyleSheet,
    ActivityIndicator,
    FlatList,
    Dimensions
} from 'react-native';
import { AppContext } from '../providers/AppProvider';
import SongItem from './Atoms/SongItem';

const { width } = Dimensions.get('window');

const Songs = () => {
    const { tracks, isLoading } = useContext(AppContext);

    return (
        <View style={styles.container}>
            <StatusBar />
            {
                isLoading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <>
                        <View style={styles.topSection}>
                            <Text style={styles.topTitle}>Tous les titres</Text>
                            <Text style={styles.topSubtitle}>{tracks.length} </Text>
                        </View>
                        <View style={styles.downSection}>
                            <FlatList data={tracks} renderItem={({ item }) => (
                                <SongItem song={item} />
                            )} />
                        </View>
                    </>
                )
            }
        </View>
    );
};

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


export default Songs;
