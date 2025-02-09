import * as Keychain from 'react-native-keychain';

export const saveToken = async(token: string): Promise<void> => {
    try {
        await Keychain.setGenericPassword("token", token);
    } catch (error) {
        console.error("error setting token", error);
    }
}

export const deleteToken = async(): Promise<void> => {
    try {
        await Keychain.resetGenericPassword();
    } catch (error) {
        console.error("error deleting token", error);
    }
}

export const getToken = async(): Promise<string | null> => {
    try {
        const credentials = await Keychain.getGenericPassword();
        if(credentials){
            return credentials.password;
        }else{
            return null;
        }
    } catch (error) {
        console.error("error retrieving token", error);
        return null
    }
}