import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { deleteToken } from "../services/keychainService";
import { useContext, useEffect } from "react";
import { Category, DataContext, Question } from "../store/DataContext";

function Home({ navigation }: { navigation: NavigationProp<any> }): React.JSX.Element {

    // Access the context values
    const { categories, currentCategoryIndex, questions, fetchCategories, fetchQuestionsByCategory } = useContext(DataContext);

    const handleLogout = async () => {
        await deleteToken();
        navigation.navigate('login');
    };

    useEffect(() => {
        fetchCategories();
    }, [])

    // Example: Fetch questions for the current category
    useEffect(() => {
        if (categories.length > 0) {
            console.log(currentCategoryIndex + " current index right now")
            fetchQuestionsByCategory(currentCategoryIndex);
            console.log(questions);
        }
    }, [categories, currentCategoryIndex]);

    const renderCategoryItem = ({ item }: { item: Category }) => (
        <View>
            <Text>{item.name}</Text>
        </View>
    );

    const renderQuestionItem = ({ item }: { item: Question }) => (
        <View>
            <Text>{item.content}</Text>
        </View>
    );

    return (
        <View>
            <View >
                <Text>Categories</Text>
            </View>

            {/* Render the list of categories */}
            <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(category) => String(category.id)}
            />
            {/* Render the list of questions */}
            <FlatList
                data={questions || []}
                renderItem={renderQuestionItem}
                keyExtractor={(question) => String(question.id)}
            />
            <View>
                <Button title='Logout' onPress={handleLogout} />
            </View>
        </View>
    )
}
export default Home;