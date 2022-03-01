import React from 'react'
import Divider from '../../../components/Divider';

const WordsLearned = () => {
  const wordList = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '17',
    '18',
    '19',
    '20',
  ]
  return (
    <div className="inline-block align-top h-full w-8/12 p-10">
      <span className="text-2xl">Words Learned</span>
      <Divider />
      <div className="w-full mt-5 h-most overflow-auto no-scrollbar p-100">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead className="text-white">
              <tr>
                <th>#</th>
                <th>Word</th>
                <th>Answer</th>
                <th>Your Answer</th>
              </tr>
            </thead>
            <tbody>
              {wordList.map((word) => (
                <tr>
                  <th>{word}</th>
                  <td>Japanese</td>
                  <td>English</td>
                  <td>Answer</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default WordsLearned;
