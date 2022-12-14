/* eslint-disable prettier/prettier */
// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import TrackPlayer, { Capability, useProgress, Event, useTrackPlayerEvents } from 'react-native-track-player';
import MusicFiles, { RNAndroidAudioStore } from 'react-native-get-music-files';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(null);
    const progress = useProgress();
    const [tracks, setTracks] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [artists, setArtists] = useState([]);


    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            setCurrentTrack(track);
        }
    });

    const getSongs = () => {
        RNAndroidAudioStore.getSongs({}).then((titles) => {
            setTracks(titles);
        }).catch((error) => {
            console.log(error);
        });
    };

    const getArtists = () => {
        RNAndroidAudioStore.getArtists({})
            .then((authors) => {
                setArtists(authors);
            }).catch((error) => {
                console.log(error);
            });
    };

    const getAlbums = () => {
        RNAndroidAudioStore.getAlbums({})
            .then((albs) => {
                setAlbums(albs);
            }).catch((error) => {
                console.log(error);
            });
    };

    const handleInitPlayList = async (playlist, trackIndex = null) => {
        try {
            await TrackPlayer.add(playlist);
            if (trackIndex !== null) {
                await TrackPlayer.skip(trackIndex);
            }
            else {
                await TrackPlayer.play();
            }
        } catch (error) {
            console.log('==============handle init error');
            console.log(error);
        }
        console.log('============== handle init playlist ======================');
        console.log(currentTrack);
        console.log('===============end handle init =====================');
    };

    const initializePlayer = async () => {
        try {
            await TrackPlayer.setupPlayer({})
                .then((player) => {
                    console.log('============player instance');
                    console.log(player);
                    TrackPlayer.updateOptions({
                        stopWithApp: true,
                        capabilities: [
                            Capability.Play,
                            Capability.Pause,
                            Capability.SkipToNext,
                            Capability.SkipToPrevious,
                            Capability.Stop,
                        ],
                        compactCapabilities: [Capability.Play, Capability.Pause],
                    });
                    setIsLoading(false);
                }
                ).catch((error) => {
                    console.log(error);
                }
                );
        } catch (error) {
            console.log(error);
        }
    };

    const resetPlayBack = () => {
        TrackPlayer.reset();
    };

    const handleCurrentTrack = async () => {
        let trackIndex = await TrackPlayer.getCurrentTrack();
        let trackObject = await TrackPlayer.getTrack(trackIndex);
        setCurrentTrack(trackObject);
    };

    const handlePlayPause = async () => {
        if (isPlaying) {
            await TrackPlayer.pause();
            setIsPlaying(false);
        } else {
            if (currentTrack !== null) {
                await TrackPlayer.play();
                setIsPlaying(true);
            }
        }
    };

    const handleSkipToNext = async () => {
        await TrackPlayer.skipToNext();
        setIsPlaying(true);
        console.log('next');
    };

    const handleSkipToPrevious = async () => {
        if (currentTrack === null) {
            handleInitPlayList();
            await TrackPlayer.skipToPrevious();
            handleCurrentTrack();
        }
        if (await TrackPlayer.skipToPrevious()) {
            setIsLoading(true);
        }
        console.log('previous');
    };

    const handleStop = async () => {
        await TrackPlayer.stop();
        setIsPlaying(false);
        console.log('stop');
    };

    const handleSeek = async (position) => {
        await TrackPlayer.seekTo(position);
        console.log('seek');
    };

    useEffect(() => {
        getSongs(); // get songs
        getArtists(); // get artists
        getAlbums(); // get albums
        initializePlayer(); // initialize player
    }, []);

    return (
        <AppContext.Provider
            value={{
                tracks,
                artists,
                albums,
                progress,
                isPlaying,
                currentTrack,
                isLoading,
                resetPlayBack,
                handlePlayPause,
                handleSkipToNext,
                handleSkipToPrevious,
                handleStop,
                handleSeek,
                handleInitPlayList,
            }}>
            {children}
        </AppContext.Provider>
    );
};
