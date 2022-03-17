<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Answer;
use App\Models\Attempt;
use App\Models\User;

class AnswerController extends Controller
{
    public function index()
    {
        $answers = Answer::all();

        return response()->json([
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

        return response()->json([
            'answer' => $answer,
        ], 201);
    }

    public function destroy(Answer $answer)
    {
        $answer->delete();

        return response()->json([
            'message' => 'Answer Deleted',
        ], 201);
    }
    public function getAnswersByAttempt(Attempt $attempt)
    {
        $answers = $attempt->answers;

        return response()->json([
            "answers" => $answers,
        ], 201);
    }

    public function getAnswersByUser(User $user) {

        $attempts = $user->attempts;
        $answerList = collect([]);

        foreach ($attempts as $attempt) {
            $answers = $attempt->answers;
            foreach ($answers as $answer) {
                $answer->word;
            }
            $answerList = $answerList->merge($answers);
        }

        return response()->json([
            "attempts" => $attempts,
            "answers" => $answerList,
        ], 201);
    }

    public function getCategory(Answer $answer)
    {
        $category = $answer->word->category;

        return response()->json([
            "category" => $category,
        ], 201);
    }

    public function getAnswerByAttemptAndWord(Attempt $attempt, $wordId)
    {
        $answers = $attempt->answers;

        foreach ($answers as $answer) {
            $word = $answer->word;
            if ($word->id == $wordId) {
                return response()->json([
                    "answer" => $answer,
                ], 201);
            }
        }

        return response()->json([
            "message" => "No answer for this word yet",
        ], 401);
    }
}
