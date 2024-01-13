import { Text, View } from "react-native";
import { AuthTopBar } from "../components/ui_components";
import { commonStyles } from "../components/form_components";

export default function Splash() {
    return (
        <View style={commonStyles.container}>
            <AuthTopBar />
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 0.9 }}>
                <Text style={commonStyles.title}>Welcome To Little Lemon</Text>
            </View>
        </View>
    );
}