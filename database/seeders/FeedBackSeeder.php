<?php

namespace Database\Seeders;

use App\Models\FeedBack;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FeedBackSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        FeedBack::factory(10)->create();
    }
}
