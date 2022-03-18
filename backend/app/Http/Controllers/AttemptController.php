<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use App\Models\Attempt;
use App\Models\Answer;
use App\Models\User;
use App\Models\Category;
use Carbon\Carbon;

class AttemptController extends Controller
{
    public function index()
    {
        $attempts = Attempt::with(['user', 'category'])->get();

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
        
        foreach ($request->answers as $key=>$answer) {
            $answer = Answer::create([
                'attempt_id' => $attempt->id,
                'word_id' => $request->word_ids[$key],
                'question_no' => $request->question_nos[$key],
                'answer' => $answer,
            ]);
        }

        return response()->json([
            'attempt' => $attempt,
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

    public function getAttemptsByUser($userId)
    {
        $attempts = Attempt::with(['user', 'category'])->where('user_id', $userId)->get();

        return response()->json([
            'attempts' => $attempts,
        ], 201);
    }
    public function getAttemptBySlugAndId($userId, Category $category)
    {
        $attempt = Attempt::where('user_id', $userId)
            ->whereHas('answers.word', function ($query) use ($category) {
                $query->where('category_id', '=', $category->id);
            })->get()->first();

        if ($attempt == null) {
            return response()->json([
                'message' => 'User has not attempted lesson yet'
            ], 401);
        }

        return response()->json([
            'attempt' => $attempt,
        ], 201);
    }
}
