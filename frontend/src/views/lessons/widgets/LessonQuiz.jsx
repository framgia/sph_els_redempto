import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BASEAPI from '../../../api/baseApi'
import LessonItem from './LessonItem';
import Cookies from 'js-cookie'

const LessonQuiz = () => {
    const currentUser = JSON.parse(Cookies.get('user'))
    const navigate = useNavigate();
    const { lessonSlug } = useParams()

    const [wordList, setWordList] = useState(null);
    const [category, setCategory] = useState(null);
    const [attempt, setAttempt] = useState(null)
    const [answers, setAnswers] = useState([]);

    const [isBegun, setIsBegun] = useState(false);
    const [isTaken, setIsTaken] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [currNo, setCurrNo] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        BASEAPI.get(`categories/${lessonSlug}/words`)
            .then(response => {
                setWordList(response.data.words)
                setCategory(response.data.category)
            })
        BASEAPI.get(`/users/${currentUser.id}/attempts/${lessonSlug}`)
            .then(response => {
                setAttempt(response.data.attempt)
            })
            .catch(error=>{
                setIsTaken(false)
            })
    }, [lessonSlug, currentUser.id])

    const handleSubmit = () => {
        setIsSubmitting(true);
        const formData = new FormData();
        
        formData.append('user_id', currentUser.id)
        formData.append('category_id', category.id)
        formData.append('score', score)
        answers.map((answer, index) => {
            formData.append('word_ids[]', wordList[index].id)
            formData.append('question_nos[]', index + 1)
            formData.append('answers[]', answer)
            return 0;
        })

        BASEAPI.post(`attempts`, formData)
            .finally(() => {
                navigate("/dashboard/history")
            })
    }

    const renderLessonItem = () => {
        if (wordList == null) {
            return <span className='font-bold text-3xl'>Loading...</span>
        }
        else if (!(currNo < wordList.length)) {
            return <>
                <div className="text-black flex flex-col w-10/12 m-auto p-10 items-center">
                    <span className="text-5xl w-full font-bold text-center mb-20">{category.title}</span>
                    <span className="text-3xl w-full font-bold text-center mb-5">Score: {score}/{wordList.length}</span>
                    <button className="btn btn-primary text-4xl w-1/3 h-24" onClick={handleSubmit} disabled={isSubmitting}>Submit</button>
                </div>
            </>
        }
        else {
            return <LessonItem currWord={wordList[currNo]} setScore={setScore} currNo={currNo} setCurrNo={setCurrNo} setAnswers={setAnswers} />;
        }
    }

    return (
        <div className="text-black w-10/12 mx-auto mt-20 p-10">
            {
                isBegun ?
                    <>
                        {renderLessonItem()}
                    </> :
                    <div className='flex flex-col items-center'>
                        {
                            wordList == null || category == null ?
                                <span className="text-5xl w-full font-bold text-center mb-4">Loading...</span> :
                                <>
                                    {
                                        wordList.length === 0 ?
                                            <span className="text-5xl w-full font-bold text-center mb-4">No words... yet</span> :
                                            <>
                                                <span className="text-5xl w-full font-bold text-center mb-4">
                                                    {
                                                        attempt != null ? 
                                                        "You have already taken this lesson":
                                                        category.title

                                                    }
                                                </span>
                                                <button
                                                    className="btn btn-primary text-4xl w-1/3 h-24 mt-5"
                                                    onClick={() => { setIsBegun(true) }}
                                                    disabled={isTaken}
                                                >
                                                    Begin Lesson
                                                </button>
                                            </>
                                    }
                                </>
                        }
                    </div>
            }


        </div>
    )
}

export default LessonQuiz;
