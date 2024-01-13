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

export function HomeBanner() {
    return (
        <View style={{ width: '100%', height: '40%', backgroundColor: '#495e57', padding: 15 }}>
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
            <View style={[commonStyles.circleBorder, { backgroundColor: 'white' }]}>
                <Pressable>
                    <AntDesign name="search1" size={25} color="black" />
                </Pressable>
            </View>
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