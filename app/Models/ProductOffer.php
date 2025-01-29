<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductOffer extends Model
{
    /** @use HasFactory<\Database\Factories\ProductOfferFactory> */
    use HasFactory;
    protected $fillable = ['product_id', 'offer_id'];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function offer()
    {
        return $this->belongsTo(Offer::class);
    }
}
