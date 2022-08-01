/* eslint-disable react-native/no-inline-styles */
/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Slider from '@react-native-community/slider';
import { formatDurationFromSeconds } from '../helpers/cast';
import { AppContext } from '../providers/AppProvider';

const { width } = Dimensions.get('window');

// const track3 = {
//     url: 'file:///storage/emulated/0/Download/mpr_ecm_paroles_audio_officiel_mp3_55201.mp3', // Load media from the file system
//     title: 'ECM',
//     artist: 'MPR',
//     // Load artwork from the file system:
//     artwork: null,
//     duration: 244663,
// };

const Home = ({ navigation }) => {
    const { isPlaying, currentTrack, progress, handlePlayPause, handleSkipToNext,
        handleSkipToPrevious, handleSeek } = useContext(AppContext);

    console.log('isPlaying ' + isPlaying);
    console.log('===================================');
    console.log(currentTrack);
    console.log('====================================');

    const handlePlay = () => {
        console.log('handlePlay');
        handlePlayPause();
        console.log('currentTrack');
        console.log(currentTrack);
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.playerInfo}>
                <Image source={require('../../assets/casque.png')} style={styles.playerImage} />
                <View style={styles.playerInfoContainer}>
                    <Text style={styles.playerTitle}>
                        {currentTrack ? currentTrack.title : null}
                    </Text>
                    <Text style={styles.playerArtist}>
                        {currentTrack ? currentTrack.artist : null}
                    </Text>
                </View>
            </View>
            <View style={styles.playerSlider}>
                <View style={styles.playerSliderContainer}>
                    <Slider
                        style={styles.slider}
                        minimumValue={0}
                        maximumValue={progress.duration}
                        value={progress.position}
                        minimumTrackTintColor="#280D9F"
                        maximumTrackTintColor="#FFF"
                        thumbTintColor="#280D9F"
                        // onValueChange={value => handleSeek(value)}
                        onSlidingComplete={value => handleSeek(value)}
                        disabled={currentTrack === null ? true : false}
                    />
                </View>
                <View style={styles.playerSliderTime}>
                    <Text style={styles.playerSliderTimeText}>
                        {formatDurationFromSeconds(progress.position)} / {formatDurationFromSeconds(progress.duration)}
                    </Text>
                </View>
            </View>
            <View style={[styles.playerControls, { opacity: currentTrack === null ? 0.4 : 1 }]}>
                <View style={styles.playerControls__upper}>
                    <TouchableOpacity
                        onPress={handleSkipToPrevious}
                        disabled={currentTrack === null ? true : false}
                    >
                        <MaterialCommunityIcons name="skip-previous" size={30} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={(position) => handleSeek(progress.position - 10)}
                        disabled={currentTrack === null ? true : false}
                    >
                        <MaterialIcons name="replay-10" size={40} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.playBtnCover}
                        onPress={handlePlay}
                        disabled={currentTrack === null ? true : false}
                    >
                        <MaterialCommunityIcons name={isPlaying ? 'pause' : 'play'} size={50} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={(position) => handleSeek(progress.position + 10)}
                        disabled={currentTrack === null ? true : false}
                    >
                        <MaterialIcons name="forward-10" size={40} color="#FFF" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSkipToNext}
                        disabled={currentTrack === null ? true : false}
                    >
                        <MaterialCommunityIcons name="skip-next" size={30} color="#FFF" />
                    </TouchableOpacity>
                </View>
                <View style={styles.playerControls__lower}>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="playlist-music-outline" size={25} color="#555767" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="repeat-variant" size={25} color="#555767" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="shuffle-variant" size={25} color="#555767" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <MaterialCommunityIcons name="playlist-plus" size={25} color="#555767" />
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F2128',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    playerInfo: {
        flex: 3,
        width: width - 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerSlider: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerControls: {
        flex: 1,
        justifyContent: 'center',
    },
    playerImage: {
        flex: 3,
        width: width,
        height: width,
        resizeMode: 'contain',
        elevation: 1,
        shadowColor: '#000',
        shadowOpacity: 0.8,
        shadowRadius: 2,
    },
    playerInfoContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerTitle: {
        fontSize: 20,
        color: '#fff',
        fontWeight: 'bold',
    },
    playerArtist: {
        fontSize: 14,
        color: '#fff',
    },
    playerControls__upper: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    playerControls__lower: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: width / 1.2,
    },
    playBtnCover: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#280D9F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playerSliderContainer: {
        flex: 1,
        width: width / 1.1,
        justifyContent: 'center',
    },
    slider: {
        height: 10,
    },
    playerSliderTime: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    playerSliderTimeText: {
        fontSize: 16,
        color: '#555767',
    },
});

export default Home;