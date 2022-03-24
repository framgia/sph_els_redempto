import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import AdminService from '../../api/adminService';
import CategoryService from '../../api/categoryService';
import Divider from '../../components/Divider'

const WordEdit = () => {

    const navigate = useNavigate();
    const { lessonSlug, wordId } = useParams()
    const [lesson, setLesson] = useState([])
    const [wordInput, setWordInput] = useState("")
    const [answer, setAnswer] = useState("")
    const [choice1, setChoice1] = useState("")
    const [choice2, setChoice2] = useState("")
    const [choice3, setChoice3] = useState("")
    const [choice4, setChoice4] = useState("")

    useEffect(() => {
        CategoryService.getWord(wordId)
            .then(response => {
                const wordSelected = response.data.word
                setWordInput(wordSelected.word)
                setAnswer(wordSelected.correct_answer)
                setChoice1(wordSelected.choices[0])
                setChoice2(wordSelected.choices[1])
                setChoice3(wordSelected.choices[2])
                setChoice4(wordSelected.choices[3])
            })
    }, [lessonSlug, wordId])

    useEffect(() => {
        CategoryService.getCategory(lessonSlug)
            .then(response => {
                const data = response.data.category
                setLesson(data)
            })
    }, [lessonSlug])

    const radioButton = (choice, setChoice) =>
        <div className="w-full flex justify-between items-center">
            <input
                type="text"
                className="input input-bordered text-white my-2 w-full mr-5"
                value={choice}
                placeholder="Input Choice"
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

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData()

        formData.append('category_id', lesson.id)
        formData.append('word', wordInput)
        formData.append('choices[0]', choice1)
        formData.append('choices[1]', choice2)
        formData.append('choices[2]', choice3)
        formData.append('choices[3]', choice4)
        formData.append('correct_answer', answer)

        AdminService.updateWord(wordId, formData, () => {
            navigate(-1)
        })
    }

    return (
        <div className="flex-1 w-fulltext-black item">
            <div className="h-full flex flex-col w-8/12 m-auto text-black p-4">
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Editing Word</span>
                    <button className="btn btn-ghost text-blue-600" onClick={() => { navigate(-1) }}>Back</button>
                </div>
                <Divider />
                <form className="form-control flex-1 p-3" onSubmit={handleSubmit}>
                    <label className="label">
                        <span className="label-text text-black text-xl font-bold">Word</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered text-white"
                        value={wordInput}
                        placeholder="Input Word"
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
