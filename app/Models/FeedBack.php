<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FeedBack extends Model
{
    /** @use HasFactory<\Database\Factories\FeedBackFactory> */
    use HasFactory;
    protected $fillable = ['name', 'email', 'message', 'product_id', 'rating'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
