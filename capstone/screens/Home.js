import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, Image, Pressable, StyleSheet, Text, View } from "react-native";
import { LogoImage, ProductItem } from "../components/ui_components";
import { commonStyles } from "../components/form_components";
import { createTable, filterByCategory, filterByQuery, getLocalData, saveDataToLocal } from "../helper/database";
import debounce from "lodash.debounce";
import { Searchbar } from "react-native-paper";

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
    const [queryString, setQuery] = useState('');
    const [selectedCategory, setCategory] = useState('');

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
            await getAllData();
        })();
    }, []);

    const getAllData = async () => {
        try {
            await createTable();
            let localMenuData = await getLocalData();
            if (!localMenuData.length) {
                const menuItems = await fetchData();
                saveDataToLocal(menuItems);
            }
            setMenunData(localMenuData);
            // alert(menuItems[0].name);
        } catch (e) {
            alert(e.message);
        }
    }

    const filterData = async (query, category) => {
        try {
            if (category.length) {
                setQuery('');
                const menuItems = await filterByCategory(
                    category
                );
                setMenunData(menuItems);
            }else{
                setCategory('');
                const menuItems = await filterByQuery(
                    query
                );
                setMenunData(menuItems);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const lookup = useCallback(async (q) => {
        setQuery(q);
        await filterData(q, '');
    }, []);

    const debouncedLookup = useMemo(() => debounce(lookup, 500), [lookup]);

    const handleSearchChange = (text) => {
        setQuery(text);
        debouncedLookup(text);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ width: '100%', height: '42%', backgroundColor: '#495e57', padding: 15 }}>
                <Text style={[commonStyles.secondaryColor, { fontSize: 30 }]}>Little Lemon</Text>
                <Text style={{ color: 'white', fontSize: 20 }}>Chicago</Text>
                <View style={[commonStyles.row, { flex: 1 }]}>
                    <View style={{ flex: 0.6, justifyContent: 'center' }}>

                        <Text style={{ color: 'white', fontSize: 15 }}>We are a family owned Mediterrianean restaurant, focused on traditional recipes served with a modern twist.</Text>
                    </View>
                    <View style={{ flex: 0.4, alignItems: 'flex-end' }}>
                        <Image source={require('../img/banner_image.png')} style={{ width: 130, height: 150, borderRadius: 10 }} />
                    </View>
                </View>
                {/* <View style={[commonStyles.circleBorder, { backgroundColor: 'white' }]}>
                    <Pressable onPress={() => { navigation.navigate("Search") }}>
                        <AntDesign name="search1" size={25} color="black" />
                    </Pressable>
                </View> */}
                <Searchbar
                    placeholder="Search"
                    placeholderTextColor="black"
                    onChangeText={handleSearchChange}
                    value={queryString}
                    style={homeStyle.searchBar}
                    iconColor="#495e57"
                    inputStyle={{ color: '#495e57', }}
                    elevation={1} />
            </View>
            <View style={{ padding: 10 }}>
                <Text style={{ paddingBottom: 15, fontSize: 16, fontWeight: 'bold' }}>ORDER FOR DELIVERY</Text>
                <FlatList
                    data={Categories}
                    renderItem={({ item }) => <Pressable style={item.title.toLowerCase() === selectedCategory ? homeStyle.categoryActive : homeStyle.categoryButton} onPress={async () => {
                        if (item.title.toLowerCase() === selectedCategory) {
                            setCategory('');
                            await getAllData();
                        } else {
                            setCategory(item.title.toLowerCase());
                            await filterData("", item.title.toLowerCase());
                        }
                    }}>
                        <Text style={item.title.toLowerCase() === selectedCategory ? { color: 'white' } : { color: 'black' }}>{item.title}</Text>
                    </Pressable>}
                    keyExtractor={item => item.id} horizontal={true} />
            </View>
            <View style={[commonStyles.horizontalLine, { marginHorizontal: 10 }]}></View>
            <View style={{ padding: 10, flex: 1 }}>
                <FlatList
                    data={menuDatas}
                    renderItem={({ item }) => <View>
                        {ProductItem(item)}
                        <View style={commonStyles.horizontalLine}></View>
                    </View>}
                    keyExtractor={(item, index) => index} contentContainerStyle={{ flexGrow: 1 }} />
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
    },
    categoryActive: {
        backgroundColor: '#495e57',
        color: 'white',
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginEnd: 10
    },
    searchBar: {
        marginBottom: 5,
        backgroundColor: 'white',
        shadowRadius: 0,
        shadowOpacity: 0,
    },
});