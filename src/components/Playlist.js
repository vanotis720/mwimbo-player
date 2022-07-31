/* eslint-disable eol-last */
/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

function Playlist({ navigation }) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.title}>La fonction Playlist est en developpement </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
    },
});

export default Playlist;