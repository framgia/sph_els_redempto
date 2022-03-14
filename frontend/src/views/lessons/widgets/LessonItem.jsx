import React from 'react'

function LessonItem({ currWord, setScore, currNo, setCurrNo, setAnswers }) {
    return (
        <>
            <span className="text-5xl w-full font-bold text-center">{`Question #${currNo + 1}`}</span>
            <div className="flex items-center justify-center mt-10">
                <span className="text-5xl font-bold w-1/2 text-center">{currWord.word}</span>
                <div className="flex flex-col w-1/2">
                    {
                        currWord.choices.map((item, index) =>
                            <button
                                key={index}
                                className="btn btn-info text-2xl w-full h-16 mb-3"
                                onClick={() => {
                                    setAnswers(prev => [...prev, item])
                                    if (item === currWord.correct_answer) {
                                        setScore(prev => prev + 1)
                                    }
                                    setCurrNo(prev => prev + 1)
                                }}
                            >
                                {item}
                            </button>)
                    }
                </div>
            </div>
        </>
    )
}

export default LessonItem