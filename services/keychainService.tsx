import * as Keychain from 'react-native-keychain';

export const saveToken = async(token: string): Promise<void> => {
    try {
        await Keychain.setGenericPassword("token", token);
        console.log("token stored");
    } catch (error) {
        console.error("error setting token", error);
    }
}

export const deleteToken = async(): Promise<void> => {
    try {
        await Keychain.resetGenericPassword();
        console.log("token deleted");
    } catch (error) {
        console.error("error deleting token", error);
    }
}

export const getToken = async(): Promise<string | null> => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if(credentials){
            console.log("token retrieved");
            return credentials.password;
        }else{
            console.log("no token found");
            return null;
        }
    } catch (error) {
        console.error("error retrieving token", error);
        return null
    }
}