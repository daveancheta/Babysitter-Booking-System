<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class WebhookController extends Controller
{
    public function handle(Request $request)
{
    $data = $request->input('data');

    // save payment status in DB here

    return response()->json(['status' => 'ok']);
}

}
