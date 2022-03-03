import React from 'react'
import { useState } from 'react'
import Divider from '../../components/Divider'

function CategoryAdd() {
    const [lessonTitle, setLessonTitle] = useState("")
    const [lessonBody, setLessonBody] = useState("")

    return (
        <div className="flex-1 w-fulltext-black item">
            <div className="h-full flex flex-col w-8/12 m-auto text-black p-4">
                <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">Add Category</span>
                </div>
                <Divider />
                <form className="form-control flex-1 p-3" onSubmit={() => { alert("Added Category!") }}>
                    <label className="label">
                        <span className="label-text text-black text-xl font-bold">Title</span>
                    </label>
                    <input
                        type="text"
                        className="input input-bordered text-white"
                        placeholder="Add Title"
                        value={lessonTitle}
                        onChange={(e) => {
                            setLessonTitle(e.target.value)

                        }} />
                    <label className="label mt-3">
                        <span className="label-text text-black text-xl font-bold">Body</span>
                    </label>
                    <textarea
                        className="textarea no-scrollbar h-full max-h-full text-white resize-none"
                        placeholder="Add Body"
                        value={lessonBody}
                        onChange={(e) => {
                            setLessonBody(e.target.value)
                        }}>
                    </textarea>
                    <div className="flex justify-end mt-4">
                        <input type="submit" value="Submit" className="btn" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryAdd;
