<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::all();

        return response()->json([
            'categories' => $categories,
        ], 201);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return response()->json([
            'message' => 'Nothing here yet'
        ], 404);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string'],
            'description' => ['string'],
            'slug' => ['required', 'string', 'unique:categories,slug'],
        ]);

        $category = Category::create($request->except('_token'));
        $response = [
            'message' => 'Category Created',
            'category' => $category,
        ];

        return response()->json($response, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
    //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $category->update($request->except('_token'));

        return response()->json([
            'category' => $category,
        ], 201);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        $category->delete();

        return response()->json([
            'message' => 'Category Deleted',
        ], 201);
    }

    public function showCategoryBySlug(Category $category)
    {
        return response()->json([
            'category' => $category,
        ], 201);
    }
    public function updateCategoryBySlug(Request $request, Category $category)
    {
        $category->update($request->except('_token'));

        return response()->json([
            'category' => $category,
        ], 201);
    }
    public function destroyCategoryBySlug(Category $category)
    {
        $category->delete();

        return response()->json([
            'message' => 'Category Deleted',
        ], 201);
    }
}
