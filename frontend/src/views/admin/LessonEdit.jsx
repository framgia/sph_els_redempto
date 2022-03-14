import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BASEAPI from '../../api/baseApi';
import Divider from '../../components/Divider'
import { AppContext } from '../../context/AppContext'

const LessonEdit = () => {
    const context = React.useContext(AppContext)
    const navigate = useNavigate();
    
    const [currentUser, setCurrentUser] = context.user
    const [lesson, setLesson] = useState([])
    const [lessonTitle, setLessonTitle] = useState("")
    const [lessonSlugText, setLessonSlugText] = useState("")
    const [lessonDescription, setLessonDescription] = useState("")

    const { lessonSlug } = useParams()
    useEffect(() => {
        BASEAPI.get(`categories/${lessonSlug}`)
            .then(response => {
                const data = response.data.category
                setLesson(data)
                setLessonTitle(data.title)
                setLessonSlugText(data.slug)
                setLessonDescription(data.description)
            })
    }, [lessonSlug])

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData()

        formData.append('title', lessonTitle)
        formData.append('slug', lessonSlugText)
        formData.append('description', lessonDescription)
        BASEAPI.post(`categories/${lessonSlug}/?_method=PUT`,
            formData,
            {
                headers: {
                    'Authorization': `Bearer ${currentUser.token}`,
                }
            }
        )
            .then((response) => {
                navigate(-1)
            })
            .catch((error) => console.log(error))
    }

    return (
        <div className="flex-1 w-fulltext-black item">
            <div className="h-full flex flex-col w-8/12 m-auto text-black p-4">
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Editing Lesson: {lesson.title}</span>
                    <Link to="words" className="btn btn-ghost text-blue-600">Edit words</Link>
                </div>
                <Divider />
                <form className="form-control flex-1 p-3" onSubmit={handleSubmit}>
                    <label className="label">
                        <span className="label-text text-black text-xl font-bold">Title</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered text-white"
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
                        value={lessonSlugText}
                        onChange={(e) => {
                            setLessonSlugText(e.target.value)

                        }} />
                    <label className="label mt-3">
                        <span className="label-text text-black text-xl font-bold">Body</span>
                    </label>
                    <textarea
                        className="textarea no-scrollbar h-full max-h-full text-white resize-none"
                        value={lessonDescription}
                        onChange={(e) => {
                            setLessonDescription(e.target.value)
                        }}>
                    </textarea>
                    <div className="flex justify-end mt-4">
                        <input type="submit" value="Submit" className="btn" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LessonEdit;
