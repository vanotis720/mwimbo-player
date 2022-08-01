/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { formatDuration } from "../../helpers/cast";

const SongItem = ({ song, handlePlaySong }) => {
    const { title, artist, duration, cover, fileName, path } = song;

    // console.log('====================================');
    // console.log(song);
    // console.log('====================================');

    return (
        <TouchableOpacity
            style={styles.SongItem}
            onPress={() => {
                handlePlaySong({
                    title, artist, duration, fileName,
                    url: 'file://' + path,
                    artwork: '',
                });
            }}
        >
            <View style={styles.songItem__left}>
                {cover ? (
                    <Image source={{ uri: cover }} style={styles.songItem__image} />
                ) : (
                    <Image source={require('../../../assets/casque.png')} style={styles.songItem__image} />
                )}
                <View style={styles.songItem__info}>
                    <Text style={styles.songItemTitle}>{title ?? fileName}</Text>
                    <Text style={styles.songItemArtist}>{artist ?? 'Inconnu'}</Text>
                </View>
            </View>
            <View style={styles.songItem__right}>
                <Text style={styles.songItemDuration}>
                    {formatDuration(duration)}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    SongItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFF",
        borderRadius: 10,
        paddingTop: 30,
    },
    songItem__left: {
        flex: 3,
        flexDirection: "row",
        alignItems: "flex-start",
    },
    songItem__right: {
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
    },
    songItem__info: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        marginLeft: 10,
    },
    songItemTitle: {
        fontSize: 18,
        color: "#000",
        fontWeight: "bold",
    },
    songItemArtist: {
        fontSize: 14,
        color: "gray",
    },
    songItemDuration: {
        fontSize: 14,
        color: "#000",
    },
    songItem__image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight: 10,
    },
});


export default SongItem;
