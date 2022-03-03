import React from 'react'
import { Link, useParams } from 'react-router-dom'

const LessonSplash = () => {
    const { lessonSlug } = useParams()
    return (
        <div className="text-black flex flex-col w-10/12 m-auto p-10 items-center">
            <span className="text-5xl w-full font-bold text-center mb-4">{lessonSlug}</span>
            <Link to="1" className="btn btn-primary text-4xl w-1/3 h-24 mt-5">Begin Lesson</Link>
        </div>
    )
}

export default LessonSplash;
