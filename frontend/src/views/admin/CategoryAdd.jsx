import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminService from '../../api/adminService'
import Divider from '../../components/Divider'

const CategoryAdd = () => {
    const navigate = useNavigate();
    const [lessonTitle, setLessonTitle] = useState("")
    const [lessonSlug, setLessonSlug] = useState("")
    const [lessonDescription, setLessonDescription] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData()

        formData.append('title', lessonTitle)
        formData.append('slug', lessonSlug)
        formData.append('description', lessonDescription)

        AdminService.addCategory(formData,
        )
            .then(() => navigate("/categories/edit"))
    }

    return (
        <div className="flex-1 w-full text-black item">
            <div className="h-full flex flex-col w-8/12 m-auto text-black p-4">
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Add Category</span>
                </div>
                <Divider />
                <form className="form-control flex-1 p-3" onSubmit={handleSubmit}>
                    <label className="label">
                        <span className="label-text text-black text-xl font-bold">Title</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered text-white"
                        placeholder="Add Title"
                        value={lessonTitle}
                        onChange={(e) => {
                            setLessonTitle(e.target.value)

                        }} />
                    <label className="label">
                        <span className="label-text text-black text-xl font-bold">Slug</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered text-white"
                        placeholder="Add Slug"
                        value={lessonSlug}
                        onChange={(e) => {
                            setLessonSlug(e.target.value)

                        }} />
                    <label className="label mt-3">
                        <span className="label-text text-black text-xl font-bold">Body</span>
                    </label>
                    <textarea
                        className="textarea no-scrollbar h-full max-h-full text-white resize-none"
                        placeholder="Add Body"
                        value={lessonDescription}
                        onChange={(e) => {
                            setLessonDescription(e.target.value)
                        }}>
                    </textarea>
                    <div className="flex justify-end mt-4">
                        <input type="submit" value="Add" className="btn" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryAdd;
