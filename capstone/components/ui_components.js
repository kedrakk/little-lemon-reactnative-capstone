import { Image, View } from "react-native";
import { commonStyles } from "./form_components";

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