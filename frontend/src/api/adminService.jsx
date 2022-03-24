import BASEAPI from './baseApi'

const AdminService = {
    addCategory: (formData, callback = () => { }) => {
        BASEAPI.post("categories", formData)
            .finally(callback)
    },
    deleteCategory: (categorySlug, callback = () => { }) => {
        BASEAPI.delete(`categories/${categorySlug}`)
            .finally(callback)
    },
    updateCategory: (lessonSlug, formData, callback = () => { }) => {
        BASEAPI.post(`categories/${lessonSlug}/?_method=PUT`, formData)
            .finally(callback)
    },
    deleteWord: (wordId, callback = () => { }) => {
        BASEAPI.delete(`words/${wordId}`)
            .finally(callback)
    },
    updateWord: (wordId, formData, callback = () => { }) => {

        BASEAPI.post(`words/${wordId}/?_method=PUT`, formData)
            .finally(callback)
    }
}

export default AdminService
