<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Answer;
use App\Models\Attempt;

class AnswerController extends Controller
{
    public function index()
    {
        $answers = Answer::all();

        return response([
            "answers" => $answers,
        ], 201);
    }

    public function store(Request $request)
    {
        $fields = $request->validate([
            'attempt_id' => ['required', 'integer'],
            'word_id' => ['required', 'integer'],
            'question_no' => ['required', 'integer'],
            'answer' => ['required', 'string'],
        ]);

        $answer = Answer::create($request->all());

        return response([
            'answer' => $answer,
        ], 201);
    }

    public function destroy(Answer $answer)
    {
        $answer->delete();

        return response([
            'message' => 'Answer Deleted',
        ], 201);
    }
    public function getAnswersByAttempt(Attempt $attempt)
    {
        $answers = $attempt->answers;

        return response([
            "answers" => $answers,
        ], 201);
    }

    public function getCategory(Answer $answer)
    {
        $category = $answer->word->category;

        return response([
            "category" => $category,
        ], 201);
    }

    public function getAnswerByAttemptAndWord(Attempt $attempt, $wordId)
    {
        $answers = $attempt->answers;

        foreach ($answers as $answer) {
            $word = $answer->word;
            if ($word->id == $wordId) {
                return response([
                    "answer" => $answer,
                ], 201);
            }
        }

        return response([
            "message" => "No answer for this word yet",
        ], 401);
    }
}
