import React from "react";
import { Button, Image, Pressable, Text, View } from "react-native";

export function Home({ navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <Text
                    {...props}
                    style={{ color: 'black', fontWeight: 'bold' }}>
                    Home
                </Text>
            ),
            headerRight: () => (
                <Pressable
                    onPress={() => navigation.navigate("Profile")}>
                    <Image source={require("../img/profile.png")} style={{width:50,height:50}}/>
                </Pressable>

            ),
        });
    }, [navigation]);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}