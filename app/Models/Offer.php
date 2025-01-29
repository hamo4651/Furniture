<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offer extends Model
{
    /** @use HasFactory<\Database\Factories\OfferFactory> */
    use HasFactory;
    protected $fillable = ['title' , 'description' , 'discount_percentage' , 'start_date' , 'end_date'];

    public function products()
    {
        return $this->belongsToMany(Product::class, 'product_offers');
    }

}
