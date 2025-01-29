<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Coupons extends Model
{
    /** @use HasFactory<\Database\Factories\CouponsFactory> */
    use HasFactory;
    protected $fillable = [
        'code',
        'discount_percentage',
        'start_date',
        'end_date',
        'max_uses',
    ];
    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function isValid()
    {
        return $this->max_uses > 0 && now()->between($this->start_date, $this->end_date);
    }
}
