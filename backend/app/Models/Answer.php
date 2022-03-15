<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;

    protected $fillable = [
        'attempt_id',
        'word_id',
        'question_no',
        'answer',
    ];

    public function attempt()
    {
        return $this->belongsTo(Attempt::class);
    }

    public function word() {
        return $this->belongsTo(Word::class);
    }
}
