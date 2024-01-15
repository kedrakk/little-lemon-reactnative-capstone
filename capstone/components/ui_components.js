import { Image, Pressable, Text, View } from "react-native";
import { commonStyles } from "./form_components";
import { AntDesign } from '@expo/vector-icons';

export function LogoImage() {
    return (<Image source={require('../img/logo.png')}></Image>);
}

export function AuthTopBar() {
    return (
        <View style={commonStyles.imageTopBar}>
            <LogoImage />
        </View>
    );
}

export function ProductItem(item) {
    return (
        <View style={{ width: '100%' }}>
            <Text style={{ fontSize: 17,fontWeight:'bold' }}>{item.name}</Text>
            <View style={[commonStyles.row,{flex:1}]}>
                <View style={{flex:0.7}}>
                    <Text style={{ fontSize: 14, color: 'grey',marginTop:5,marginBottom:7 }}>{item.description}</Text>
                    <Text style={{ fontSize: 15, }}>${item.price}</Text>
                </View>
                <View style={{flex:0.3,alignItems: 'flex-end'}}>
                    <Image source={{ uri: "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/" + item.image + "?raw=true" }} style={{ width: 70, height: 70,borderRadius:10 }} />
                </View>
            </View>
        </View>
    );
}