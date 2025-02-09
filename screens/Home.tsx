import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Button, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { deleteToken } from "../services/keychainService";
import { useContext, useEffect, useState } from "react";
import { Answer, Category, DataContext, Question } from "../store/DataContext";

function Home({ navigation }: { navigation: NavigationProp<any> }): React.JSX.Element {

    // Access the context values
    const { categories, currentCategoryIndex, setCurrentCategoryIndex, questions, fetchCategories, fetchQuestionsByCategory } = useContext(DataContext);

    const [answers, setAnswers] = useState<Answer[]>([]);

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

    const renderQuestionItem = ({ item }: { item: Question }) => {
        const answer = answers.find((ans) => ans.questionId === item.id);
        return (
            <View style={styles.questionItem}>
                <Text style={styles.questionText}>{item.content}</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your answer..."
                    value={answer ? answer.content : ""}
                    onChangeText={(text) => handleAnswerChange(item.id, text)}
                />
            </View>
        );
    };

    // Function to handle text input change
    const handleAnswerChange = (questionId: number, text: string) => {

        setAnswers((prevAnswers) => {
            const existingAnswerIndex = prevAnswers.findIndex((ans) => ans.questionId === questionId);
            if (existingAnswerIndex !== -1) {
                const updatedAnswers = [...prevAnswers];
                updatedAnswers[existingAnswerIndex] = {
                    ...updatedAnswers[existingAnswerIndex],
                    content: text
                };
                return updatedAnswers;
            } else {
                return [...prevAnswers, { id: 0, content: text, userId: 1, questionId }]
            }
        })
        console.log(answers);
    };

    const nextCategory = () => {
        if (currentCategoryIndex <= categories.length - 1) {
            setCurrentCategoryIndex(currentCategoryIndex + 1);
            console.log(currentCategoryIndex);
        } else {
            console.log("no more categories");
        }
    }
    const previousCategory = () => {
        if (currentCategoryIndex >= 0) {
            setCurrentCategoryIndex(currentCategoryIndex - 1);
            console.log(currentCategoryIndex);
        } else {
            console.log("no more categories");
        }
    }

    return (
        <View style={styles.container}>
            {categories.length > 0 && (
                <Text style={styles.header}>{categories[currentCategoryIndex - 1]?.name}</Text>
            )}

            {/* Render the list of questions */}
            <FlatList
                data={questions || []}
                renderItem={renderQuestionItem}
                keyExtractor={(question) => String(question.id)}
                contentContainerStyle={styles.listContainer}
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[styles.button, currentCategoryIndex === 1 && styles.disabledButton]}
                    onPress={previousCategory}
                    disabled={currentCategoryIndex === 1}
                >
                    <Text style={styles.buttonText}>Previous</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, currentCategoryIndex > categories.length - 1 && styles.disabledButton]}
                    onPress={nextCategory}
                    disabled={currentCategoryIndex > categories.length - 1}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#F5F5F5",
    },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
    },
    listContainer: {
        paddingBottom: 20,
    },
    questionItem: {
        backgroundColor: "#FFF",
        padding: 15,
        marginBottom: 10,
        borderRadius: 8,
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    questionText: {
        fontSize: 16,
        color: "#333",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
    },
    button: {
        backgroundColor: "#007AFF",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    disabledButton: {
        backgroundColor: "#B0B0B0",
    },
    logoutButton: {
        marginTop: 20,
        backgroundColor: "#FF3B30",
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    logoutText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    input: {
        backgroundColor: "#E8E8E8",
        padding: 10,
        borderRadius: 8,
        fontSize: 16,
        color: "#000",
    },
});