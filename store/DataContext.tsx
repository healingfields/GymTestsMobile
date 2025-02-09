import React, { createContext, ReactNode, useEffect, useState } from "react";
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
    currentCategoryIndex: number;
    setCurrentCategoryIndex: (index: number) => void,
    questions: Question[];
    fetchCategories: () => Promise<void>;
    fetchQuestionsByCategory: (CategoryId: number) => Promise<void>;
}

export const DataContext = createContext<DataContextProps>({
    categories: [],
    currentCategoryIndex: 1,
    setCurrentCategoryIndex: () => {},
    questions: [],
    fetchCategories: async () => {},
    fetchQuestionsByCategory: async () => {},
  });

interface DataProviderProps{
    children: ReactNode;
}
export const DataProvider = ({children}: DataProviderProps): React.JSX.Element => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [currentCategoryIndex, setCurrentCategoryIndex] = useState(1);
    const [questions, setQuestions] = useState<Question[]>([]);

    const fetchCategories = async(): Promise<void> =>{
        try{
            getCategories()
            .then((data) => {
                setCategories(data);
            })  
        }catch(error){
            console.log('eror setting the data in the state', error);
        }
    };

    const fetchQuestionsByCategory = async(categoryId: number): Promise<void> => {
        try{
            getQuestionsByCategory(categoryId)
            .then((data) => setQuestions(data));
        }catch(error){
            console.log('eror setting questions state', error);
        }
    }
    
    
    return(
        <DataContext.Provider value={{categories, currentCategoryIndex, setCurrentCategoryIndex, questions, fetchCategories, fetchQuestionsByCategory}}>
            {children}
        </DataContext.Provider>
    );
};