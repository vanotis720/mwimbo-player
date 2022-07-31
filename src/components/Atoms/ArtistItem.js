/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable prettier/prettier */
import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

const ArtistItem = ({ author }) => {
    const { id, artist, numberOfAlbums, numberOfSongs } = author;

    return (
        <TouchableOpacity
            style={styles.SongItem}
            onPress={() => {
                console.log('clicked' + id);
            }}
        >
            <View style={styles.songItem__left}>
                <Image source={require('../../../assets/casque.png')} style={styles.songItem__image} />
                <View style={styles.songItem__info}>
                    <Text style={styles.songItemTitle}>{artist}</Text>
                </View>
            </View>
            <View style={styles.songItem__right}>
                <Text style={styles.songItemDuration}>
                    {numberOfAlbums} Albums - {numberOfSongs} Titres
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
        flex: 2,
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


export default ArtistItem;
