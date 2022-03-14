import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import BASEAPI from '../../../api/baseApi';

const LessonQuiz = () => {
    const navigate = useNavigate();
    const { lessonSlug } = useParams()

    const [wordList, setWordList] = useState((null));
    const [currNo, setCurrNo] = useState(0);
    const [score, setScore] = useState(0);

    useEffect(() => {
        BASEAPI.get(`categories/${lessonSlug}/words`)
            .then(response => {
                setWordList(response.data.words)
            })
    }, [lessonSlug])

    const renderLessonItem = () => {
        if (wordList == null) {
            return <span className='font-bold text-3xl'>Loading...</span>
        }
        else if (!(currNo < wordList.length)) {
            navigate(`/lesson/${lessonSlug}/review`);
            return <></>
        }
        else {
            return <>
                <span className="text-5xl font-bold w-1/2 text-center">{wordList[currNo].word}</span>
                <div className="flex flex-col w-1/2">
                    {
                        wordList[currNo].choices.map((item, index) =>
                            <button
                                key={index}
                                className="btn btn-info text-2xl w-full h-16 mb-3"
                                onClick={() => {
                                    if (item === wordList[currNo].correct_answer) {
                                        setScore(prev => prev + 1)
                                    }
                                    setCurrNo(prev => prev + 1)
                                }}
                            >
                                {item}
                            </button>)
                    }
                </div>
            </>
        }
    }

    return (
        <div className="text-black w-10/12 mx-auto mt-20 p-10 items-center">
            <span className="text-5xl w-full font-bold text-center">{`Question #${currNo + 1}`}</span>
            <div className="flex items-center justify-center mt-10">
                {renderLessonItem()}
            </div>
        </div>
    )
}

export default LessonQuiz;
