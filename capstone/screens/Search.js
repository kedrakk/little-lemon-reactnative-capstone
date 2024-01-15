import React, { useState } from "react";
import { Text, TextInput } from "react-native";
import { SearchBar } from "react-native-screens";
import { commonStyles } from "../components/form_components";

export function Search(navigation) {

    const [queryBar, setQuerybar] = useState('');

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <SearchBar
                    placeholder="Search"
                    placeholderTextColor="white"
                    onChangeText={setQuerybar}
                    value={queryBar}
                    style={commonStyles.inputBoxStyle}
                    iconColor="white"
                    inputStyle={{ color: 'white' }}
                    elevation={0} />
            ),
        });
    }, [navigation]);
    return (
        <Text>Search</Text>
    );
}