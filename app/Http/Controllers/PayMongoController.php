<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class PayMongoController extends Controller
{
    public function PayMongoPayment($addedBalance)
    {
        $balance = (int) $addedBalance * 100;

        $response = Http::withBasicAuth(
            config('services.paymongo.secret'),
            ''
        )->post('https://api.paymongo.com/v1/links', [
            'data' => [
                'attributes' => [
                    'amount' => $balance,
                    'description' => 'PayMongo Test Payment',
                    'remarks' => 'TEST ONLY',
                    'redirect_url' => route('paymongo.callback'),
                ]
            ]
        ])->json();

        $linkId = $response['data']['id'];

        session([
            'paymongo_link_id' => $linkId,
            'balance' => $addedBalance

        ]);

        return redirect($response['data']['attributes']['checkout_url']);
    }

    public function callback()
    {
        $userId = Auth::id();

        $linkId = session('paymongo_link_id');
        $balance = session('balance');

        if (!$linkId) {
            dd('Link ID not found in session.');
        }

        $response = Http::withBasicAuth(
            config('services.paymongo.secret'),
            ''
        )->get("https://api.paymongo.com/v1/links/{$linkId}")->json();

        $paymentStatus = $response['data']['attributes']['status'] ?? 'unknown';

        $paymentMethod = null;
        if (!empty($attributes['payments'])) {
            $paymentMethod =
                $attributes['payments'][0]['attributes']['payment_method_details']['type'] ?? null;
        }

        $currentBalance = User::where('id', $userId)->first();
        $newBalance = (float) $balance + $currentBalance->balance;

        if ($paymentStatus === "paid") {
            User::where('id', $userId)->update(['balance' => $newBalance]);
        }

        dd([
            'link_id' => $linkId,
            'balance' => $balance,
            'status' => $paymentStatus,
            'paymentMethod' => $paymentMethod,
            'raw_response' => $response,
        ]);
    }
}
