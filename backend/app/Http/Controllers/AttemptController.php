<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Attempt;
use Carbon\Carbon;
use App\Models\Answer;
use App\Models\User;
use App\Models\Category;

class AttemptController extends Controller
{
    public function index()
    {
        $attempts = Attempt::all();

        return response()->json([
            'attempts' => $attempts,
        ], 201);
    }

    public function show(Attempt $attempt)
    {
        return response()->json([
            'attempt' => $attempt,
        ], 201);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => ['required', 'integer'],
            'category_id' => ['required', 'integer'],
            'word_ids' => ['required', 'array'],
            'question_nos' => ['required', 'array'],
            'answers' => ['required', 'array'],
            'score' => ['required', 'integer'],
        ]);

        $attempt = Attempt::create([
            'user_id' => $request->user_id,
            'category_id' => $request->category_id,
            'date_finished' => Carbon::now(),
            'score' => $request->score,
        ]);

        $index = 0;

        foreach ($request->answers as $answer) {
            $answer = Answer::create([
                'attempt_id' => $attempt->id,
                'word_id' => $request->word_ids[$index],
                'question_no' => $request->question_nos[$index],
                'answer' => $answer,
            ]);
        }

        return response()->json([
            'attempt' => $attempt,
            'word_ids' => $request->word_ids,
            'question_nos' => $request->question_nos,
            'answers' => $request->answers,
        ], 201);
    }

    public function update(Request $request, Attempt $attempt)
    {
    //
    }
    public function destroy(Attempt $attempt)
    {
        $attempt->delete();

        return response()->json([
            'message' => 'Attempt Deleted',
        ], 201);
    }

    public function getAttemptsByUser(User $user)
    {
        $attempts = $user->attempts;

        return response()->json([
            'attempts' => $attempts,
        ], 201);
    }
    public function getAttemptBySlugAndId($userId, Category $category)
    {
        $word = $category->words->first();
        if ($word == null) {
            return response()->json([
                'message' => "No words in category",
            ], 401);
        }

        $answers = $word->answers;

        if ($answers == null) {
            return response()->json([
                'message' => "No attempts found",
            ], 401);
        }
        else if (count($answers) == 0) {
            return response()->json([
                'message' => "No attempts for this category",
            ], 401);
        }

        foreach ($answers as $answer) {
            $attempt = $answer->attempt;
            $user = $attempt->user;

            if ($user->id != $userId) {
                continue;
            }

            return response()->json([
                'attempt' => $attempt,
            ], 201);
        }

        return response()->json([
            'message' => 'No attempts in this category',
        ], 401);
    }
}
