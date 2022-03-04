import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getData } from '../../api/mockApi';
import Divider from '../../components/Divider';

const WordsEdit = () => {
    const { lessonId } = useParams()
    const [lesson, setLesson] = useState([])
    const [words, setWords] = useState([])
    const [currentEdit, setCurrentEdit] = useState(-1);
    const [currentWord, setCurrentWord] = useState("");
    const [currentWordIndex, setCurrentWordIndex] = useState(-1);

    useEffect(() => {
        getData("http://localhost:3000/data.json")
            .then(json => {
                const x = json.categories.find(category => category.id === parseInt(lessonId))
                setLesson(x)
                setWords(x.words)
            })
    }, [lessonId])

    const [pageNo, setPageNo] = useState(0);
    const itemPerPage = 10;
    const pageButtons = [];
    for (let i = 0; i <= Math.floor((words.length - 1) / itemPerPage); i++) {
        pageButtons.push(<button key={i} className={`btn btn-sm ${pageNo === i ? "btn-active" : ""}`} onClick={() => setPageNo(i)}>{i + 1}</button>)
    }

    const cancelEdit = (event) => {
        setCurrentWordIndex(-1)
        setCurrentWord("")
        setCurrentEdit(-1)
    }

    const handleWordKeyPress = (event) => {
        event.preventDefault()
        if (event.key === 'Enter') {
            setWords(prevList => {
                prevList[currentWordIndex].word = currentWord
                return prevList
            })
            cancelEdit()
        }
        if (event.key === 'Escape') {
            cancelEdit()
        }
    }

    const handleChoiceKeyPress = (event) => {
        if (event.key === 'Enter') {
            setWords(prevList => {
                prevList[currentWordIndex].word = currentWord
                return prevList
            })

            setCurrentWordIndex(-1)
            setCurrentWord("")
            setCurrentEdit(-1)
        }
    }

    return (
        <div className="flex-1 w-full text-black item">
            <div className="flex flex-col w-8/12 m-auto text-black p-4 justify-around">
                <span className="text-2xl font-bold">Editing Words: {lesson.title}</span>
                <Divider />
                <table className="table table-compact w-full mt-5">
                    <thead className="text-white">
                        <tr>
                            <th>ID</th>
                            <th>Word</th>
                            <th>Choice 1</th>
                            <th>Choice 2</th>
                            <th>Choice 3</th>
                            <th>Choice 4</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            words.map((word, i) => {
                                if (i >= (itemPerPage * pageNo) && i < itemPerPage + (itemPerPage * pageNo)) {
                                    return (
                                        <tr key={i} className={`${i % 2 ? "bg-gray-200" : ""}`}>
                                            <th>{word.id}</th>
                                            <td
                                                onDoubleClick={() => {
                                                    setCurrentWordIndex(i)
                                                    setCurrentEdit(word.id)
                                                    setCurrentWord(word.word)
                                                }}
                                                onBlur={() => { cancelEdit() }}>
                                                {
                                                    currentEdit === word.id ?
                                                        <input
                                                            type="text"
                                                            className='input input-xs text-white'
                                                            value={currentWord}
                                                            autoFocus
                                                            onChange={(event) => setCurrentWord(event.target.value)}
                                                            onKeyPress={handleWordKeyPress}
                                                        /> :
                                                        <span>
                                                            {word.word}
                                                        </span>
                                                }

                                            </td>
                                            {
                                                word.choices.map((choice, j) => {
                                                    return (
                                                        <td key={j}>
                                                            <input
                                                                type="radio"
                                                                name={`answer-${i}`}
                                                                className="inline-block radio radio-primary"
                                                            />
                                                            <div className="inline-block ml-2" checked>{choice}</div>
                                                        </td>
                                                    )
                                                })
                                            }
                                            {/* <td>
                                                <input
                                                    type="radio"
                                                    name={`answer-${i}`}
                                                    className="inline-block radio radio-primary"
                                                />
                                                <div className="inline-block ml-2" checked>{word.choices[0]}</div>
                                            </td> */}
                                            {/* <td>
                                                <input
                                                    type="radio"
                                                    name={`answer-${i}`}
                                                    className="inline-block radio radio-primary"
                                                />
                                                <div className="inline-block ml-2">{word.choices[1]}</div>
                                            </td>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name={`answer-${i}`}
                                                    className="inline-block radio radio-primary"
                                                />
                                                <div className="inline-block ml-2">{word.choices[2]}</div>
                                            </td>
                                            <td>
                                                <input
                                                    type="radio"
                                                    name={`answer-${i}`}
                                                    className="inline-block radio radio-primary"
                                                />
                                                <div className="inline-block ml-2">{word.choices[3]}</div>
                                            </td> */}
                                        </tr>
                                    )
                                }

                                return null;
                            })
                        }
                    </tbody>
                </table>
                <div className="btn-group w-full mt-10">
                    {
                        pageButtons.length > 1 &&
                        pageButtons.map((button) => button)
                    }
                </div>
            </div>
        </div>
    )
}

export default WordsEdit;
