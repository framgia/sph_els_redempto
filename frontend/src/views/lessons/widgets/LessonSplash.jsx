import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getData } from '../../../api/api'

const LessonSplash = () => {
    const { lessonSlug } = useParams()
    const [words, setWords] = useState(null);

    useEffect(() => {
        const getWord = async () => {
            const result = await getData("http://localhost:8000/", `categories/words/${lessonSlug}`);
            setWords(result);
        }
        getWord()
    }, [lessonSlug])

    return (
        <div className="text-black flex flex-col w-10/12 m-auto p-10 items-center">
            {
                words == null ?
                    <span className="text-5xl w-full font-bold text-center mb-4">Loading...</span> :
                    <>
                    {
                        words.length === 0 ?
                            <span className="text-5xl w-full font-bold text-center mb-4">No words... yet</span> :
                                <>
                                    <span className="text-5xl w-full font-bold text-center mb-4">{lessonSlug}</span>
                                    <Link to="quiz" className="btn btn-primary text-4xl w-1/3 h-24 mt-5">Begin Lesson</Link>
                                </>
                    }
                    </>
            }
        </div>
    )
}

export default LessonSplash;
