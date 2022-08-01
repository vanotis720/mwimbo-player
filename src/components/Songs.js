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
    const { tracks, isLoading, handleInitPlayList } = useContext(AppContext);

    const handlePlaySong = (track) => {
        console.log('===============handle play song=====================');
        console.log(track);
        console.log('================end handle play====================');
        handleInitPlayList([tracks]);
    };

    return (
        <View style={styles.container}>
            <StatusBar />
            {
                isLoading || tracks.length === 0 ? (
                    <ActivityIndicator size="large" color="#fff" />
                ) : (
                    <>
                        <View style={styles.topSection}>
                            <Text style={styles.topTitle}>Tous les titres</Text>
                            <Text style={styles.topSubtitle}>{tracks.length} </Text>
                        </View>
                        <View style={styles.downSection}>
                            <FlatList data={tracks} renderItem={({ item }) => (
                                <SongItem song={item} handlePlaySong={handlePlaySong} />
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
        justifyContent: 'center',
        alignItems: 'center',
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
