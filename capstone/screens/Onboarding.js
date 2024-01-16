import React from "react";
import { View, StyleSheet, Text, SafeAreaView, Alert, Pressable, TextInput } from "react-native";
import { storeData } from "../helper/storage_helper";
import { AuthContext } from "../App";
import { commonStyles } from "../components/form_components";
import { AuthTopBar } from "../components/ui_components";

export default function Onboarding({ navigation }) {

    const { signIn } = React.useContext(AuthContext);

    const [firstName, onFirstNameChanged] = React.useState('');
    const [lastName, onLastNameChanged] = React.useState('');
    const [email, onEmailChanged] = React.useState('');
    const [phoneNumber, onPhoneChanged] = React.useState('');
    const [password, onPasswordChanged] = React.useState('');

    const checkValidation = () => {
        var errorText = '';
        if (!firstName.trim()) errorText += "First Name ";
        if (!lastName.trim()) errorText += "Last Name ";
        if (!email.trim()) errorText += "Email ";
        if (!phoneNumber.trim()) errorText += "Phone Number ";
        if (!password.trim()) errorText += "Password ";
        if (errorText.trim()) errorText += "must be filled";
        return errorText;
    };

    return (
        <SafeAreaView style={commonStyles.container}>
            <AuthTopBar />
            <View style={OnboardingStyles.middlePart}>
                <View style={{ flex: 0.1 }} />
                <Text style={commonStyles.title}>Let us get to know you</Text>
                <View style={{ flex: 0.2 }} />
                <View style={commonStyles.inputParent}>
                    <TextInput placeholder="First Name" onChangeText={onFirstNameChanged} value={firstName} style={[commonStyles.inputBoxStyle,OnboardingStyles.inputBoxWidth]} />
                </View>
                <View style={commonStyles.inputParent}>
                    <TextInput placeholder="Last Name" onChangeText={onLastNameChanged} value={lastName} style={[commonStyles.inputBoxStyle,OnboardingStyles.inputBoxWidth]} />
                </View>
                <View style={commonStyles.inputParent}>
                    <TextInput placeholder="Phone" onChangeText={onPhoneChanged} value={phoneNumber} keyboardType={'phone-pad'} style={[commonStyles.inputBoxStyle,OnboardingStyles.inputBoxWidth]} />
                </View>
                <View style={commonStyles.inputParent}>
                    <TextInput placeholder="Email" onChangeText={onEmailChanged} value={email} keyboardType={'email-address'} style={[commonStyles.inputBoxStyle,OnboardingStyles.inputBoxWidth]} />
                </View>
                <View style={commonStyles.inputParent}>
                    <TextInput placeholder="Password" onChangeText={onPasswordChanged} value={password} keyboardType={'visible-password'} style={[commonStyles.inputBoxStyle,OnboardingStyles.inputBoxWidth]} />
                </View>
            </View>
            <View style={OnboardingStyles.bottomBar}>
                <Pressable style={[commonStyles.buttonStyle, OnboardingStyles.nextBtn]} onPress={async () => {
                    let hasError = checkValidation();
                    if (!hasError.trim()) {
                        try {
                            var loggedInUser = { firstName: firstName, lastName: lastName, email: email, phone: phoneNumber, password: password, isOrderStatusChecked:true,isPasswordChange:true,isSpecialOffer:true,isNewsLetter:true };
                            await storeData("loggedInUser", JSON.stringify(loggedInUser));
                            Alert.alert("User account created successfully!");
                            signIn(email, password);
                        } catch (error) {
                            console.log(error);
                        }
                    }
                    else {
                        Alert.alert(hasError);
                    }
                }}>
                    <Text style={OnboardingStyles.btnText}>Next</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const OnboardingStyles = StyleSheet.create({
    middlePart: {
        flex: 0.8,
        backgroundColor: 'bluegrey',
        alignItems: 'center',
    },
    bottomBar: {
        flex: 0.1,
        backgroundColor: 'azure',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    nextBtn: {
        marginHorizontal: 20,
        backgroundColor: '#495e57',
    },
    btnText: {
        color: 'white'
    },
    inputBoxWidth:{
        width: '90%'
    }
});