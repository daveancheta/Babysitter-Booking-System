<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $babysitterId = Auth::id();

        $bookings = DB::table('bookings')
        ->leftJoin('users', 'bookings.user_id', '=', 'users.id')
        ->select(
            'users.*',
            'bookings.*',
        )
        ->where('babysitter_id', $babysitterId)
        ->get();
        return Inertia::render('Babysitter/Notification', compact('bookings'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        request()->validate([
            'booking_id' => 'nullable',
            'action' => 'nullable'
        ]);

        $bookingId = $request->input('booking_id');
        Booking::where('id', $bookingId)
        ->update(['status' => $request->input('action')]);

        return redirect()->route('notification.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
