import { StyleSheet } from "react-native";

export const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    inputBoxStyle: {
        height: 45,
        marginHorizontal: 10,
        marginVertical: 7,
        borderWidth: 1,
        borderColor: '#495e57',
        padding: 10,
        fontSize: 16,
        borderRadius: 5,
        backgroundColor: '#EDEFEE',
    },
    inputLabel: {
        fontSize: 13,
    },
    inputLabelWrapper: {
        width: '100%',
    },
    inputParent: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 8
    },
    buttonStyle: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 4,
        elevation: 3,
    },
    title: {
        fontSize: 25,
    },
    imageTopBar: {
        flex: 0.1,
        backgroundColor: 'azure',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    checkbox: {
        marginRight: 10,
        color: '#495e57'
    },
    circleBorder:{
        padding:10,
        height:50,
        width:50,
        borderRadius:50/2,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center'
    },
    secondaryColor:{
        color:"#f1cf12"
    },
    horizontalLine:{
        borderWidth: 0.5,
        borderColor:'grey',
        marginVertical:15,
    }
});