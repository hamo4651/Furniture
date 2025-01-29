<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    /** @use HasFactory<\Database\Factories\ProductFactory> */
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'price',
        'category_id',
        'quantity',
        'status',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class , 'product_id');
    }
    public function offers()
    {
        return $this->belongsToMany(Offer::class, 'product_offers');
    }
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }
    public function cartItems()
    {
        return $this->hasMany(CartItem::class);
    }
    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_items')
        ->withPivot('quantity', 'price');      }

        public function feedBacks()
        {
            return $this->hasMany(FeedBack::class);
        }
}
