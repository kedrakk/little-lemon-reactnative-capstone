import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { CategoryButton, HomeBanner, LogoImage, ProductItem } from "../components/ui_components";
import { commonStyles } from "../components/form_components";

const Categories = [{ id: 1, title: "Starters" }, { id: 2, title: "Mains" }, { id: 3, title: "Desserts" }, { id: 4, title: "Drinks" }];
const API_URL = "https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json";

export function Home({ navigation }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <LogoImage />
            ),
            headerRight: () => (
                <Pressable
                    onPress={() => navigation.navigate("Profile")}>
                    <Image source={require("../img/profile.png")} style={{ width: 50, height: 50 }} />
                </Pressable>

            ),
        });
    }, [navigation]);

    const [menuDatas, setMenunData] = useState([]);
    //! Fetch Data
    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            const json = await response.json();
            let menu = json.menu;
            return menu;
        } catch (error) {
            console.log(error);
        }
        return [];
    }

    useEffect(() => {
        (async () => {
            try {
                const menuItems = await fetchData();
                setMenunData(menuItems);
                // alert(menuItems[0].name);
            } catch (e) {
                alert(e.message);
            }
        })();
    }, []);

    return (
        <View style={{flex:1}}>
            <HomeBanner />
            <View style={{ padding: 10 }}>
                <Text style={{ paddingBottom: 15, fontSize: 16, fontWeight: 'bold' }}>ORDER FOR DELIVERY</Text>
                <FlatList
                    data={Categories}
                    renderItem={({ item }) => <Pressable style={homeStyle.categoryButton}>
                        <Text>{item.title}</Text>
                    </Pressable>}
                    keyExtractor={item => item.id} horizontal={true} />
            </View>
            <View style={[commonStyles.horizontalLine,{marginHorizontal:10}]}></View>
            <View style={{ padding: 10,flex:1 }}>
                <FlatList
                    data={menuDatas}
                    renderItem={({ item }) => <View>
                        {ProductItem(item)}
                        <View style={commonStyles.horizontalLine}></View>
                    </View>}
                    keyExtractor={(item, index) => index} contentContainerStyle={{flexGrow:1}}/>
            </View>
        </View>
    );
}

const homeStyle = StyleSheet.create({
    categoryButton: {
        backgroundColor: 'lightgrey',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginEnd: 10
    }
});