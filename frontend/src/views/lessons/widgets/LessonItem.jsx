import React from 'react'
import { Link, useParams } from 'react-router-dom';

const LessonItem = () => {
    const { lessonSlug, itemNo } = useParams()
    const nextNo = parseInt(itemNo) + 1
    return (
        <div className="text-black w-10/12 mx-auto mt-20 p-10 items-center">
            <span className="text-5xl w-full font-bold text-center">{`Question #${itemNo}`}</span>
            <div className="flex items-center justify-center mt-10">
                <span className="text-5xl font-bold w-1/2 text-center">Word</span>
                <div className="flex flex-col w-1/2">
                    <Link to={`/lesson/${lessonSlug}/${nextNo <= 20 ? nextNo : "review"}`} className="btn btn-info text-2xl w-full h-16 mb-3">Choice 1</Link>
                    <Link to={`/lesson/${lessonSlug}/${nextNo <= 20 ? nextNo : "review"}`} className="btn btn-info text-2xl w-full h-16 mb-3">Choice 2</Link>
                    <Link to={`/lesson/${lessonSlug}/${nextNo <= 20 ? nextNo : "review"}`} className="btn btn-info text-2xl w-full h-16">Choice 3</Link>
                    <Link to={`/lesson/${lessonSlug}/${nextNo <= 20 ? nextNo : "review"}`} className="btn btn-info text-2xl w-full h-16 mt-3">Choice 4</Link>
                </div>
            </div>
        </div>
    )
}

export default LessonItem;
