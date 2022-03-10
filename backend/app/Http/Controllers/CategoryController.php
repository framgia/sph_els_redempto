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
        return response([
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
        return response([
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

        $category = Category::create($request->all());
        $response = [
            'message' => 'Category Created',
            'category' => $category,
        ];

        return response($response, 201);
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
        $category->update($request->all());

        return response([
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

        return response([
            'message' => 'Category Deleted',
        ], 201);
    }

    public function showCategoryBySlug(Category $category)
    {
        return response([
            'category' => $category,
        ], 201);
    }
    public function updateCategoryBySlug(Request $request, Category $category)
    {
        $category->update($request->all());

        return response([
            'category' => $category,
        ], 201);
    }
    public function destroyCategoryBySlug(Category $category)
    {
        $category->delete();

        return response([
            'message' => 'Category Deleted',
        ], 201);
    }
}
