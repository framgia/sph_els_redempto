import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getData } from '../../api/mockApi';
import Divider from '../../components/Divider'

const LessonEdit = () => {
    const [lesson, setLesson] = useState([])
    const [lessonTitle, setLessonTitle] = useState("")
    const [lessonBody, setLessonBody] = useState("")

    const { lessonSlug } = useParams()
    useEffect(() => {
        getData("http://localhost:3000/data.json")
            .then(json => {
                const x = json.categories.find(category => category.slug === lessonSlug)
                setLesson(x)
                setLessonTitle(x.title)
                setLessonBody(x.body)
            })
    }, [lessonSlug])

    const handleSubmit = () => {
        alert("Edited Category!") 
    }

    return (
        <div className="flex-1 w-fulltext-black item">
            <div className="h-full flex flex-col w-8/12 m-auto text-black p-4">
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Editing Lesson: {lesson.title}</span>
                    <Link to="words" className="btn btn-ghost text-blue-600">Edit words</Link>
                </div>
                <Divider />
                <form className="form-control flex-1 p-3" onSubmit={() => {handleSubmit()}}>
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
                    <label className="label mt-3">
                        <span className="label-text text-black text-xl font-bold">Body</span>
                    </label>
                    <textarea
                        className="textarea no-scrollbar h-full max-h-full text-white resize-none"
                        value={lessonBody}
                        onChange={(e) => {
                            setLessonBody(e.target.value)
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
