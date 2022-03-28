import BASEAPI from './baseApi'

const AdminService = {
    addCategory: (formData, headers = {}) => {
        return BASEAPI.post("categories", formData, headers)
    },
    deleteCategory: (categorySlug, headers = {}) => {
        return BASEAPI.delete(`categories/${categorySlug}`, headers)
    },
    updateCategory: (lessonSlug, formData, headers = {}) => {
        return BASEAPI.post(`categories/${lessonSlug}/?_method=PUT`, formData, headers)
    },
    addWord: (formData, headers = {}) => {
        return BASEAPI.post("words", formData, headers)
    },
    deleteWord: (wordId, headers = {}) => {
        return BASEAPI.delete(`words/${wordId}`, headers)
    },
    updateWord: (wordId, formData, headers = {}) => {
        return BASEAPI.post(`words/${wordId}/?_method=PUT`, formData, headers)
    }
}

export default AdminService
