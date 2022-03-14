<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attempt extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'date_started',
        'score',
    ];

    protected $attributes = [
        'date_finished' => null,
        'score' => 0,
    ];

    protected $dates = [
        'date_started',
        'date_finished',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category() {
        return $this->belongsTo(Category::class);
    }

    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
