import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native"
import { getToken } from "../services/keychainService";

function AuthLoadingScreen({navigation}: {navigation: NavigationProp<any>}) : React.JSX.Element{


    useEffect(() => {
        const checkToken =  async () => {
            const token = await getToken();
            if(token){
                navigation.navigate('home');
            }else{
                navigation.navigate('login');
            }
        };
        checkToken();
    }, []);

    return (
        <View>
            <ActivityIndicator />
        </View>
    )

};

export default AuthLoadingScreen;