import React from 'react'
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getData } from '../../api/mockApi';
import Divider from '../../components/Divider';

const WordsEdit = () => {
    const { lessonSlug } = useParams()
    const [lesson, setLesson] = useState([])
    const [words, setWords] = useState([])

    useEffect(() => {
        getData("http://localhost:3000/data.json")
            .then(json => {
                const x = json.categories.find(category => category.slug === lessonSlug)
                setLesson(x)
                setWords(x.words)
            })
    }, [lessonSlug])

    const [pageNo, setPageNo] = useState(0);
    const itemPerPage = 10;
    const pageButtons = [];
    for (let i = 0; i <= Math.floor((words.length - 1) / itemPerPage); i++) {
        pageButtons.push(<button key={i} className={`btn btn-sm ${pageNo === i ? "btn-active" : ""}`} onClick={() => setPageNo(i)}>{i + 1}</button>)
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
                            <th>Answer</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            words.map((word, i) => {
                                if (i >= (itemPerPage * pageNo) && i < itemPerPage + (itemPerPage * pageNo)) {
                                    return (
                                        <tr key={i} className={`${i % 2 ? "bg-gray-200" : ""}`}>
                                            <th>{word.id}</th>
                                            <td> {word.word} </td>
                                            {
                                                word.choices.map((choice, j) => {
                                                    return (
                                                        <td key={j}>
                                                            <div className="inline-block ml-2" checked>{choice}</div>
                                                        </td>
                                                    )
                                                })
                                            }
                                            <td>{word.answer}</td>
                                            <td className="flex justify-end">
                                                <Link to={`${word.id}`} className="btn btn-ghost text-blue-600">Edit</Link>
                                            </td>
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