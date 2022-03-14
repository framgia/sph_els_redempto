<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Word;

class WordController extends Controller
{

    public function index()
    {
        $words = Word::all();
        return response([
            'words' => $words,
        ], 201);
    }
    public function store(Request $request)
    {
        $request->validate([
            'category_id' => ['required', 'integer'],
            'word' => ['required', 'string'],
            'choices' => ['required', 'array', 'min:4'],
            'correct_answer' => ['required', 'string'],
        ]);

        $word = Word::create($request->all());
        $response = [
            'message' => 'Word Created',
            'category' => $word,
        ];

        return response($response, 201);
    }

    public function update(Request $request, Word $word)
    {
        $word->update($request->all());

        return response([
            'word' => $word,
        ], 201);
    }

    public function show(Word $word)
    {
        return response([
            'word' => $word,
        ], 201);
    }

    public function destroy(Word $word) {
        $word->delete();

        return response([
            'message' => 'Word Deleted',
        ], 201);
    }

    public function getWordBySlug(Category $category, Word $word)
    {
        return response([
            'word' => $word,
        ], 201);
    }

    public function getWordsBySlug(Category $category)
    {
        return response([
            'words' => $category->words,
        ], 201);
    }
}
