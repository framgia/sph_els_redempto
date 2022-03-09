<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class WordController extends Controller
{
    public function getWordsBySlug(Category $category) {
        return $category->words;
    }
}
