<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentController extends Controller
{
    public function createCheckout(Request $request)
    {
        $amount = $request->amount * 100;

        $payload = [
            "data" => [
                "attributes" => [
                    "amount" => $amount,
                    "description" => "Test Payment",
                    "cancel_url" => url('/payment/cancel'),
                    "success_url" => url('/payment/success'),
                    "payment_method_types" => ["gcash", "card"]
                ]
            ]
        ];

        $response = Http::withBasicAuth(config('paymongo.secret'), '')
                        ->post("https://api.paymongo.com/v1/checkout_sessions", $payload);

        $json = $response->json();

        // ✅ Detect API error
        if (!$response->successful()) {
            Log::error("PAYMONGO ERROR", $json);
            return response()->json([
                "error" => $json["errors"][0]["detail"] ?? "PayMongo error"
            ], 500);
        }

        // ✅ Successful response
        $checkoutUrl = $json['data']['attributes']['checkout_url'];

        return response()->json([
            'checkout_url' => $checkoutUrl
        ]);
    }

    
}


