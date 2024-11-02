import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { deleteToken } from "../services/keychainService";
import { useContext } from "react";
import { DataContext } from "../store/DataContext";

function Home({navigation}: {navigation: NavigationProp<any>}): React.JSX.Element{

    const dataContext = useContext(DataContext);

    const {categories, questions, fetchCategories, fetchQuestionsByCategory} = dataContext;

    const handleLogout =  async () => {
        await deleteToken();
        navigation.navigate('login');
    };

    return (
        <View>
            <Text>Categories</Text>
            <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => (
                    <TouchableOpacity>
                        <Text>{item.name}</Text>
                    </TouchableOpacity>
                )}
                />
            <Button  title='Logout' onPress={handleLogout}/>
        </View>
    )
}
export default Home;