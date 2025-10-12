<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Super Admin',
            'email' => 'superadmin@gmail.com',
            'password' => 'superadmin12345',
            'is_admin' => true,
            'ip_address' => '123.456.7.89',
        ]);
        User::factory()->create([
            'account_id' => 'kZRVIP32He',
            'name' => 'Joe Goldberg',
            'email' => 'joegoldberg@gmail.com',
            'profile' => 'profile/RLUgH6K4ceBJhL2WIodvCwB4z8IpNQlGsPlKRr8I.jpg',
            'is_babysitter' => false,
            'is_admin' => false,
            'email_verified_at' => '2025-09-26 03:34:29',
            'password' => 'goldberg1234',
            'ip_address' => '123.456.7.89',
        ]);
        User::factory()->create([
            'account_id' => '0RRtTCZYsF',
            'name' => 'Love Quinn',
            'email' => 'lovequinn@gmail.com',
            'profile' => 'profile/22YdYFzDAmRPf9CBvK5sLxczOfHKynJCI27UafSr.webp',
            'is_babysitter' => true,
            'is_admin' => false,
            'email_verified_at' => '2025-09-26 03:34:29',
            'password' => 'quinn1234',
            'ip_address' => '123.456.7.89',
            'rate' => '250.00',
        ]);
        User::factory()->create([
            'account_id' => 'bA5rD5lH9M',
            'name' => 'Guinevere Beck',
            'email' => 'guineverebeck@gmail.com',
            'profile' => 'profile/S0kgxnIBMGJxLLqBUsEddqSxWSB222cGAcjihsED.jpg',
            'is_babysitter' => true,
            'is_admin' => false,
            'email_verified_at' => '2025-09-26 03:34:29',
            'password' => 'beck1234',
            'ip_address' => '123.456.7.89',
            'rate' => '500.00',
        ]);
        User::factory()->create([
            'account_id' => 'vH4iB3PA2N',
            'name' => 'Dave Ancheta',
            'email' => 'daveancheta@gmail.com',
            'is_babysitter' => false,
            'is_admin' => true,
            'email_verified_at' => '2025-09-26 03:34:29',
            'password' => 'ancheta1234',
            'ip_address' => '123.456.7.89',
        ]);
    }
}
