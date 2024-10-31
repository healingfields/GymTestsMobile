const BASE_URL = "http://localhost:8080";

interface Category{
    id: number,
    name: string,
}

interface Question{
    id: number,
    content: string
}

export const getCategories = async(): Promise<Category[]> =>{
 try{
    const response = await fetch(`${BASE_URL}/categories`);
    if(!response.ok)throw new Error("failed to retrives categories");

    const data: Category[]=  await response.json();
    return data;
 }catch(error){
    console.error("error fetching data", error);
    throw error;
 }
}

export const getQuestionsByCategory = async(categoryId: number): Promise<Question[]> => {
    try{
        const response = await fetch(`${BASE_URL}/categories/${categoryId}/questions`);
        if(!response.ok)throw new Error("failed to fetch questions");
        
        const data = await response.json();
        return data;
    }catch(error){
        console.error("error fetching questions", error);
        throw error;
    }
}
