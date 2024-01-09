import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../App";

export function Profile({navigation}) {
    const { signOut } = React.useContext(AuthContext);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <Text
                    {...props}
                    style={{ color: 'white', fontWeight: 'bold' }}>
                    Profile
                </Text>
            ),
            headerStyle: {
                backgroundColor: '#f4511e', //Set Header color
            },
        });
    }, [navigation]);
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Profile Screen</Text>
            <Pressable style={styles.logoutBtn} onPress={signOut}>
                <Text>Logout</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    logoutBtn:{
        backgroundColor: 'yellow'
    }
  });