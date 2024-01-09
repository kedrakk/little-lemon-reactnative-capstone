import React from "react";
import { View, StyleSheet, Text, SafeAreaView, Alert, Pressable, TextInput } from "react-native";
import { storeData } from "../helper/storage_helper";
import { AuthContext } from "../App";

export default function Onboarding({navigation}) {

    const {signIn} = React.useContext(AuthContext);

    const [firstName, onFirstNameChanged] = React.useState('');
    const [lastName, onLastNameChanged] = React.useState('');
    const [email, onEmailChanged] = React.useState('');
    const [phoneNumber, onPhoneChanged] = React.useState('');
    const [password, onPasswordChanged] = React.useState('');

    const checkValidation=()=>{
        var errorText = '';
        if(!firstName.trim()) errorText +="First Name ";
        if(!lastName.trim()) errorText +="Last Name ";
        if(!email.trim()) errorText +="Email ";
        if(!phoneNumber.trim()) errorText +="Phone Number ";
        if(!password.trim()) errorText +="Password ";
        if(errorText.trim()) errorText +="must be filled";
        return errorText;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.topBar}>
                <Text style={styles.content}>Little Lemon</Text>
            </View>
            <View style={styles.middlePart}>
                <Text style={styles.titlePart}>Let us get to know you</Text>
                <View style={{flex:0.5}} />
                <View style={styles.inputParent}>
                    {/* <Text style={styles.content}>First Name</Text> */}
                    <TextInput placeholder="First Name" onChangeText={onFirstNameChanged} value={firstName} style={styles.inputBoxStyle} />
                </View>
                <View style={styles.inputParent}>
                    {/* <Text style={styles.content}>Last Name</Text> */}
                    <TextInput placeholder="Last Name" onChangeText={onLastNameChanged} value={lastName} style={styles.inputBoxStyle} />
                </View>
                <View style={styles.inputParent}>
                    {/* <Text style={styles.content}>Phone</Text> */}
                    <TextInput placeholder="Phone" onChangeText={onPhoneChanged} value={phoneNumber} keyboardType={'phone-pad'} style={styles.inputBoxStyle} />
                </View>
                <View style={styles.inputParent}>
                    {/* <Text style={styles.content}>Email</Text> */}
                    <TextInput placeholder="Email" onChangeText={onEmailChanged} value={email} keyboardType={'email-address'} style={styles.inputBoxStyle} />
                </View>
                <View style={styles.inputParent}>
                    {/* <Text style={styles.content}>Password</Text> */}
                    <TextInput placeholder="Password" onChangeText={onPasswordChanged} value={password} keyboardType={'visible-password'} style={styles.inputBoxStyle} />
                </View>
            </View>
            <View style={styles.bottomBar}>
                <Pressable style={styles.nextBtn} onPress={async() => {
                    // navigation.popToTop();
                    // let hasError = checkValidation();
                    // if(!hasError.trim()){
                    //     var loggedInUser = {firstName:firstName,lastName:lastName,email:email,phone:phoneNumber,password:password};
                    //     await storeData(loggedInUserKey,JSON.stringify(loggedInUser));
                    //     Alert.alert("User account created successfully!");
                    // }
                    // else{
                    //     Alert.alert(hasError);
                    // }
                    signIn(email,password);
                }}>
                    <Text style={styles.btnText}>Next</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    topBar: {
        width: '100%',
        padding: 3,
        flex: 0.1,
        backgroundColor: 'azure',
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        color: "black",
        fontSize: 20
    },
    middlePart: {
        flex: 0.8,
        backgroundColor: 'bluegrey',
        alignItems: 'center',
        //justifyContent: 'center',
    },
    bottomBar: {
        flex: 0.1,
        backgroundColor: 'azure',
        // alignItems: 'center'
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    nextBtn: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginHorizontal: 20,
        backgroundColor: 'lightslategrey',
        borderRadius: 4,
        elevation: 3,
    },
    btnText: {
        color: 'white',
        fontSize: 17
    },
    inputParent: {
        width: '100%',
        alignItems: 'center',
        marginVertical:8
    },
    inputBoxStyle: {
        height: 45,
        marginHorizontal: 10,
        marginVertical: 7,
        borderWidth: 1,
        borderColor: 'darkgreen',
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        backgroundColor: '#EDEFEE',
        width: '90%'
    },
    titlePart: {
        color: "black",
        fontSize: 25,
        padding: 30
    },

});