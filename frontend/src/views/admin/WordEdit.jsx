import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getData } from '../../api/mockApi';
import Divider from '../../components/Divider'

const WordEdit = () => {
    const navigate = useNavigate();
    const [wordInput, setWordInput] = useState("")
    const [answer, setAnswer] = useState("")
    const [choice1, setChoice1] = useState("")
    const [choice2, setChoice2] = useState("")
    const [choice3, setChoice3] = useState("")
    const [choice4, setChoice4] = useState("")
    const { lessonSlug, wordId } = useParams()

    useEffect(() => {
        getData("http://localhost:3000/data.json")
            .then(json => {
                const x = json.categories.find(category => category.slug === lessonSlug)
                const wordSelected = x.words.find(word => word.id === parseInt(wordId))
                setWordInput(wordSelected.word)
                setAnswer(wordSelected.answer)
                setChoice1(wordSelected.choices[0])
                setChoice2(wordSelected.choices[1])
                setChoice3(wordSelected.choices[2])
                setChoice4(wordSelected.choices[3])
            })
    }, [lessonSlug, wordId])

    const radioButton = (choice, setChoice) =>
        <div className="w-full flex justify-between items-center">
            <input
                type="text"
                className="input input-bordered text-white my-2 w-full mr-5"
                value={choice}
                onChange={(e) => {
                    const newValue = e.target.value
                    if (choice === answer) {
                        setAnswer(newValue)
                    }
                    setChoice(newValue)
                }}
            />
            <input
                type="radio"
                name="choice-input"
                className="radio radio-secondary mr-5"
                value={choice}
                checked={choice === answer}
                onChange={e => {
                    setAnswer(e.target.value)
                }}
            />
        </div>

    return (
        <div className="flex-1 w-fulltext-black item">
            <div className="h-full flex flex-col w-8/12 m-auto text-black p-4">
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Editing Word</span>
                    <button className="btn btn-ghost text-blue-600" onClick={() => { navigate(-1) }}>Back</button>
                </div>
                <Divider />
                <form className="form-control flex-1 p-3" onSubmit={(e) => {
                    e.preventDefault()
                    alert("Edited Category!")
                }}>
                    <label className="label">
                        <span className="label-text text-black text-xl font-bold">Word</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered text-white"
                        value={wordInput}
                        onChange={(e) => {
                            setWordInput(e.target.value)
                        }} />
                    <label className="label mt-3">
                        <span className="label-text text-black text-xl font-bold">Choices</span>
                    </label>
                    {radioButton(choice1, setChoice1)}
                    {radioButton(choice2, setChoice2)}
                    {radioButton(choice3, setChoice3)}
                    {radioButton(choice4, setChoice4)}
                    <div className="flex justify-end mt-4">
                        <input type="submit" value="Submit" className="btn" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default WordEdit;
