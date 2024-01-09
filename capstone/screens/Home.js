import React from "react";
import { Button, Pressable, Text, View } from "react-native";

export function Home({ navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <Text
                    {...props}
                    style={{ color: 'white', fontWeight: 'bold' }}>
                    Home
                </Text>
            ),
            headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
            },
            headerRight: () => (
                <Pressable
                    onPress={() => navigation.navigate("Profile")}>
                    <Text>Profile</Text>
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