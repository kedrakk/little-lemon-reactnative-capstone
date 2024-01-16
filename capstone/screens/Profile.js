import React, { useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthContext } from "../App";
import { clearAllForLogout, getData, storeData } from "../helper/storage_helper";
import { LogoImage } from "../components/ui_components";
import { commonStyles } from "../components/form_components";
import Checkbox from 'expo-checkbox';

export function Profile({ navigation }) {
    const { signOut } = React.useContext(AuthContext);
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: (props) => (
                <LogoImage />
            ),
            headerRight: () => (
                <Image source={require("../img/profile.png")} style={{ width: 50, height: 50 }} />

            ),
        });
    }, [navigation]);

    const [firstName, onFirstNameChanged] = React.useState('');
    const [lastName, onLastNameChanged] = React.useState('');
    const [email, onEmailChanged] = React.useState('');
    const [phoneNumber, onPhoneChanged] = React.useState('');
    const [password, onPasswordChanged] = React.useState('');

    const [isOrderStatusChecked, setOrderStatus] = useState(false);
    const [isPasswordChange, setPasswordChange] = useState(false);
    const [isSpecialOffer, setSpecialOrder] = useState(false);
    const [isNewsLetter, setNewLetters] = useState(false);

    useEffect(() => {
        (
            async () => {
                try {
                    const data = await getData("loggedInUser");
                    var decodedData = JSON.parse(data);
                    onFirstNameChanged(decodedData.firstName)
                    onLastNameChanged(decodedData.lastName);
                    onEmailChanged(decodedData.email);
                    onPhoneChanged(decodedData.phone);
                    onPasswordChanged(decodedData.password);
                    setOrderStatus(decodedData.isOrderStatusChecked);
                    setPasswordChange(decodedData.isPasswordChange);
                    setSpecialOrder(decodedData.isSpecialOffer);
                    setNewLetters(decodedData.isNewsLetter);
                } catch (error) {
                    alert(error);
                }
            }
        )();
    }, []);

    return (
        <ScrollView>
            <View style={[commonStyles.container, { padding: 20 }]}>
                <Text style={{ fontSize: 19 }}>Personal Information</Text>
                <View style={{ paddingVertical: 5 }}>
                    <Text style={{ fontSize: 12, color: "grey" }}>Avatar</Text>
                    <View style={commonStyles.row}>
                        <Image source={require("../img/profile.png")} style={{ width: 70, height: 70 }} />
                        <View style={styles.rowParent}>
                            <Pressable style={[commonStyles.buttonStyle, styles.changeButtonStyle]} onPress={()=>{
                                Alert.alert("Coming Soon");
                            }}>
                                <Text style={{ color: 'white' }}>Change</Text>
                            </Pressable>
                        </View>
                        <View style={styles.rowParent}>
                            <Pressable style={[commonStyles.buttonStyle, styles.removeButtonStyle]} onPress={()=>{
                                Alert.alert("Coming Soon");
                            }}>
                                <Text style={{ color: '#495e57' }}>Remove</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={commonStyles.inputParent}>
                    <View style={commonStyles.inputLabelWrapper}>
                        <Text style={commonStyles.inputLabel}>First Name</Text>
                    </View>
                    <TextInput placeholder="First Name" onChangeText={onFirstNameChanged} value={firstName} style={[commonStyles.inputBoxStyle, styles.inputBoxStyle]} />
                </View>
                <View style={commonStyles.inputParent}>
                    <View style={commonStyles.inputLabelWrapper}>
                        <Text style={commonStyles.inputLabel}>Last Name</Text>
                    </View>
                    <TextInput placeholder="Last Name" onChangeText={onLastNameChanged} value={lastName} style={[commonStyles.inputBoxStyle, styles.inputBoxStyle]} />
                </View>
                <View style={commonStyles.inputParent}>
                    <View style={commonStyles.inputLabelWrapper}>
                        <Text style={commonStyles.inputLabel}>Phone</Text>
                    </View>
                    <TextInput placeholder="Phone" onChangeText={onPhoneChanged} value={phoneNumber} keyboardType={'phone-pad'} style={[commonStyles.inputBoxStyle, styles.inputBoxStyle]} />
                </View>
                <View style={commonStyles.inputParent}>
                    <View style={commonStyles.inputLabelWrapper}>
                        <Text style={commonStyles.inputLabel}>Email</Text>
                    </View>
                    <TextInput placeholder="Email" onChangeText={onEmailChanged} value={email} keyboardType={'email-address'} style={[commonStyles.inputBoxStyle, styles.inputBoxStyle]} />
                </View>
                <View style={{ marginBottom: 8 }}>
                    <Text style={{ fontSize: 16, marginBottom: 10 }}>Email Notifications</Text>
                    <View style={[commonStyles.row, styles.checkBoxWrapper]}>
                        <Checkbox value={isOrderStatusChecked} onValueChange={setOrderStatus} style={commonStyles.checkbox} color={isOrderStatusChecked ? '#495e57' : undefined} />
                        <Text>Order Status</Text>
                    </View>
                    <View style={[commonStyles.row, styles.checkBoxWrapper]}>
                        <Checkbox value={isPasswordChange} onValueChange={setPasswordChange} style={commonStyles.checkbox} color={isPasswordChange ? '#495e57' : undefined} />
                        <Text>Password Changes</Text>
                    </View>
                    <View style={[commonStyles.row, styles.checkBoxWrapper]}>
                        <Checkbox value={isSpecialOffer} onValueChange={setSpecialOrder} style={commonStyles.checkbox} color={isSpecialOffer ? '#495e57' : undefined} />
                        <Text>Special Offers</Text>
                    </View>
                    <View style={[commonStyles.row, styles.checkBoxWrapper]}>
                        <Checkbox value={isNewsLetter} onValueChange={setNewLetters} style={commonStyles.checkbox} color={isNewsLetter ? '#495e57' : undefined} />
                        <Text>Newletter</Text>
                    </View>
                </View>
                <Pressable style={[styles.logoutBtn, commonStyles.buttonStyle]} onPress={async () => {
                    await clearAllForLogout();
                    signOut();
                }}>
                    <Text>Logout</Text>
                </Pressable>
                <View style={[commonStyles.row, { marginVertical: 15, flex: 1, justifyContent: 'space-between', marginHorizontal: 10 }]}>
                    <Pressable style={[commonStyles.buttonStyle, styles.removeButtonStyle, { width: '45%', justifyContent: 'center', alignItems: 'center' }]} onPress={()=>{
                        navigation.goBack();
                    }}>
                        <Text style={{ color: '#495e57' }}>Discard Changes</Text>
                    </Pressable>
                    <Pressable style={[commonStyles.buttonStyle, styles.changeButtonStyle, { width: '45%', justifyContent: 'center', alignItems: 'center' }]} onPress={async()=>{
                        var updatedUser = { firstName: firstName, lastName: lastName, email: email, phone: phoneNumber, password: password, isOrderStatusChecked:isOrderStatusChecked,isPasswordChange:isPasswordChange,isSpecialOffer:isSpecialOffer,isNewsLetter:isNewsLetter };
                        await storeData('loggedInUser',JSON.stringify(updatedUser));
                        Alert.alert("User Updated Successfully");
                        navigation.goBack();
                    }}>
                        <Text style={{ color: 'white' }}>Save Changes</Text>
                    </Pressable>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    logoutBtn: {
        backgroundColor: 'yellow',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#495e57',
    },
    inputBoxStyle: {
        width: '100%'
    },
    rowParent: {
        paddingLeft: 20,
        paddingRight: 5,
        justifyContent: 'center'
    },
    changeButtonStyle: {
        backgroundColor: '#495e57',
    },
    removeButtonStyle: {
        borderWidth: 1,
        borderColor: '#495e57',
        backgroundColor: 'white'
    },
    checkBoxWrapper: {
        marginVertical: 5
    }
});