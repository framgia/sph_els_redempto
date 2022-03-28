import React, { useEffect, useState } from 'react'
import UserService from '../api/userService';
import Divider from './Divider';

const WordsLearned = ({ user = null }) => {
  const [answers, setAnswers] = useState([])
  const [attempts, setAttempts] = useState([])

  useEffect(() => {
    if (user == null) return
    const controller = new AbortController();

    UserService.getUserAnswers(user.id, {
      signal: controller.signal
    })
      .then(response => {
        setAttempts(response.data.attempts)
        setAnswers(response.data.answers)
      })
      .catch((err) => { })

    return () => {
      controller.abort()
    }
  }, [user])


  return (
    <div className="inline-block align-top h-full w-8/12 p-10">
      <span className="text-2xl">Word History</span>
      <Divider />
      <div className="w-full mt-5 h-most overflow-auto no-scrollbar p-100">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="text-white">
              <tr>
                <th>#</th>
                <th className='text-center'>Word</th>
                <th className='text-center'>Answer</th>
                <th className='text-center'>Your Answer</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='text-center' colSpan={2}>Lessons took: {attempts.length}</td>
                <td className='text-center' colSpan={2}>Words learned: {answers.length}</td>
              </tr>
              {answers.map((answer, index) => {
                return (
                  <tr key={index}>
                    <th>{index + 1}</th>
                    <td className='text-center'>{answer.word.word}</td>
                    <td className='text-center'>{answer.word.correct_answer}</td>
                    <td className='text-center'>{answer.answer}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default WordsLearned;
