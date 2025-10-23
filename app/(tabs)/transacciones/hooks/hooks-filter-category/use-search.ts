import { useState } from "react";
import categories from "../../mackups/categories-filter";

export const useCategories = () => {
  const [query, setQuery] = useState("");

  const filteredData = categories.filter((item) =>
    item.title.toLowerCase().includes(query.toLowerCase())
  );

  return { filteredCategories: filteredData, setQuery };
};
