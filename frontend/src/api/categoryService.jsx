import BASEAPI from './baseApi'

const CategoryService = {
    getCategories: (headers = {}) => {
        return BASEAPI.get("categories", headers)
    },
    getCategory: (categorySlug, headers = {}) => {
        return BASEAPI.get(`categories/${categorySlug}`, headers)
    },
    getCategoryWords: (categorySlug, headers = {}) => {
        return BASEAPI.get(`categories/${categorySlug}/words`, headers)
    },
    getWord: (wordId, headers = {}) => {
        return BASEAPI.get(`words/${wordId}`, headers)
    } 
}

export default CategoryService
