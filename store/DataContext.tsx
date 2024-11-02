import React, { createContext, ReactNode, useEffect, useState } from "react";
import { Text } from "react-native";
import { getCategories, getQuestionsByCategory } from "../services/apiService";

export interface Category{
    id: number,
    name: string
}

export interface Question{
    id: number,
    content: string,
    categoryId: number
}

interface DataContextProps {
    categories: Category[];
    questions: Question[];
    fetchCategories: () => Promise<void>;
    fetchQuestionsByCategory: (CategoryId: number) => Promise<void>
}

export const DataContext = createContext<DataContextProps>({
    categories: [],
    questions: [],
    fetchCategories: async () => {},
    fetchQuestionsByCategory: async () => {},
  });

interface DataProviderProps{
    children: ReactNode;
}
export const DataProvider = ({children}: DataProviderProps): React.JSX.Element => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [questions, setQuestions] = useState<Question[]>([]);

    const fetchCategories = async(): Promise<void> =>{
        try{
            const data = await getCategories();
            setCategories(data);
        }catch(error){
            console.log('error setting the data in the state', error);
        }
    };

    const fetchQuestionsByCategory = async(categoryId: number): Promise<void> =>{
        try{
        const data = await getQuestionsByCategory(categoryId);
        setQuestions(data);
        }catch(error){
            console.log('error setting questions state', error);
        }
    }

    useEffect(() => {
      fetchCategories();
    }, []);
    
    return(
        <DataContext.Provider value={{categories, questions, fetchCategories, fetchQuestionsByCategory}}>
            {children}
        </DataContext.Provider>
    );
};