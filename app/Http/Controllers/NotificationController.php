<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    public function notificationCount() 
    {
        $count = Notification::where('user_id', Auth::id())
        ->where('is_read', false)
        ->get()
        ->count();

        return response()->json($count);
    }

    public function notification()
    {
         $notification = Notification::where('user_id', Auth::id())
        ->where('is_read', false)
        ->get();

        return response()->json($notification);
    }
}
