import BASEAPI from './baseApi'

const CategoryService = {
    getCategories: () => {
        return BASEAPI.get("categories")
    },
    getCategory: (categorySlug) => {
        return BASEAPI.get(`categories/${categorySlug}`)
    },
    getCategoryWords: (categorySlug) => {
        return BASEAPI.get(`categories/${categorySlug}/words`)
    },
    getWord: (wordId) => {
        return BASEAPI.get(`words/${wordId}`)
    } 
}

export default CategoryService
