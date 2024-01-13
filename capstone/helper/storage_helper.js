import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        throw e;
    }
};

export const getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        return value;
    } catch (e) {
        throw e;
    }
};

export const clearAllForLogout = async () => {
    try {
        const value = await AsyncStorage.multiRemove(["loggedInUser", "userToken"]);
        return value;
    } catch (e) {
        throw e;
    }
};

export const delay = ms => new Promise(res => setTimeout(res, ms));

export const tokenGenerator = (lenth) => {
    const char = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890';
    const random = Array.from(
        { length: lenth },
        () => char[Math.floor(Math.random() * char.length)]
    );
    const randomString = random.join("");
    return randomString;
}