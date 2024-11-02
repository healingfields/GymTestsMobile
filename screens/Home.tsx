import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Button, Text, View } from "react-native";
import { deleteToken } from "../services/keychainService";

function Home({navigation}: {navigation: NavigationProp<any>}): React.JSX.Element{
    const handleLogout =  async () => {
        await deleteToken();
        navigation.navigate('login');
    };
    return (
        <View>
            <Button  title='Logout' onPress={handleLogout}/>
            <Text>
                Home screen
            </Text>
        </View>
    )
}
export default Home;