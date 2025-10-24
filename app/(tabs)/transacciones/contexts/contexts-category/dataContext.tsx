import { createContext, useContext } from "react";
import { useSelectCategorie } from "../../hooks/hooks-filter-category/use-select-categorie";

const CategoryContext = createContext<any>(null);

export const CategoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { selectedCategories, toggleCategory, categories, setSelectedCategories } = useSelectCategorie();

    return (
        <CategoryContext.Provider value={{ selectedCategories, toggleCategory, categories, setSelectedCategories }}>
            {children}
        </CategoryContext.Provider>
    );
}
export const useCategoryContext = () => useContext(CategoryContext);