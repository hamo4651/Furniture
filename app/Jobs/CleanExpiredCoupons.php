<?php

namespace App\Jobs;

use App\Models\Coupons;
use App\Models\Offer;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class CleanExpiredCoupons implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle()
    {
      Coupons::where('end_date', '<=', now())->delete();
        
         Offer::where('end_date', '<=', now())->delete();
      
         Coupons::where('max_uses', '=', 0)->delete();
   
    }
    
}
