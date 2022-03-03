import React from 'react'
import { Link, useParams } from 'react-router-dom'

function LessonReview() {
    const { lessonSlug } = useParams()
    return (
        <div className="text-black flex flex-col w-10/12 m-auto p-10 items-center">
            <span className="text-5xl w-full font-bold text-center mb-20">{lessonSlug}</span>
            <span className="text-3xl w-full font-bold text-center mb-5">Score: 20/20</span>
            <Link to="/dashboard/history" className="btn btn-primary text-4xl w-1/3 h-24">Submit</Link>
        </div>
    )
}

export default LessonReview