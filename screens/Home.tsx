import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Button, FlatList, Text, TouchableOpacity, View } from "react-native";
import { deleteToken } from "../services/keychainService";
import { useContext, useEffect } from "react";
import { Category, DataContext, Question } from "../store/DataContext";

function Home({ navigation }: { navigation: NavigationProp<any> }): React.JSX.Element {

    // Access the context values
    const { categories, currentCategoryIndex, setCurrentCategoryIndex, questions, fetchCategories, fetchQuestionsByCategory } = useContext(DataContext);

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
            fetchQuestionsByCategory(currentCategoryIndex);
        }
    }, [currentCategoryIndex]);

    const renderQuestionItem = ({ item }: { item: Question }) => (
        <View>
            <Text>{item.content}</Text>
        </View>
    );

    const nextCategory = () => {
        if(currentCategoryIndex <= categories.length - 1){
            setCurrentCategoryIndex(currentCategoryIndex + 1);
            console.log(currentCategoryIndex);
        }else{
            console.log("no more categories");
        }
    }
    const previousCategory = () => {
        if(currentCategoryIndex >= 0){
            setCurrentCategoryIndex(currentCategoryIndex - 1);
            console.log(currentCategoryIndex);
        }else{
            console.log("no more categories");
        }
    }

    return (
        <View>
            {categories.length > 0 && (
                <Text>{categories[currentCategoryIndex - 1]?.name}</Text>
            )}

            {/* Render the list of questions */}
            <FlatList
                data={questions || []} 
                renderItem={renderQuestionItem}
                keyExtractor={(question) => String(question.id)}
            />
            <View>
                <Button title='Logout' onPress={handleLogout} />
            </View>

            <Button title="next category" onPress={nextCategory} disabled={currentCategoryIndex > categories.length - 1} />
            <Button title="previous category" onPress={previousCategory} disabled={currentCategoryIndex === 1} />
        </View>
    )
}
export default Home;