/* eslint-disable prettier/prettier */
// import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';
import TrackPlayer, { State, Capability, useProgress, Event, useTrackPlayerEvents } from 'react-native-track-player';
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

    const getSongs = async () => {
        await MusicFiles.getAll({
            blured: true,
            artist: true,
            duration: true,
            cover: true,
            title: true,
            minimumSongDuration: 10000,
        }).then((titles) => {
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

    const handleInitPlayList = async () => {
        await TrackPlayer.add([tracks]);
        await TrackPlayer.play();
    };

    const initializePlayer = async () => {
        try {
            await TrackPlayer.setupPlayer({});
            await TrackPlayer.updateOptions({
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

        } catch (e) {
            console.log(e);
        }
    };

    const resetPlayBack = () => {
        TrackPlayer.reset();
    };

    const getState = async () => {
        const playerState = await TrackPlayer.getState();
        if (playerState === State.Playing) {
            setIsPlaying(true);
        }
        else if (playerState === State.Paused) {
            setIsPlaying(false);
        }
    };

    const handleCurrentTrack = async () => {
        let trackIndex = await TrackPlayer.getCurrentTrack();
        console.log('trackIndex', trackIndex);
        let trackObject = await TrackPlayer.getTrack(trackIndex);
        setCurrentTrack(trackObject);
    };

    const handlePlayback = async () => {
        if (isPlaying) {
            await TrackPlayer.pause();
        } else {
            if (currentTrack === null) {
                handleInitPlayList();
                handleCurrentTrack();
            }
            await TrackPlayer.play();
        }
        setIsPlaying(!isPlaying);
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
        getSongs();
        getArtists();
        getAlbums();
        initializePlayer();
        getState;
        handleCurrentTrack();
        setIsLoading(false);
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
                handlePlayback,
                handleSkipToNext,
                handleSkipToPrevious,
                handleStop,
                handleSeek,
            }}>
            {children}
        </AppContext.Provider>
    );
};
