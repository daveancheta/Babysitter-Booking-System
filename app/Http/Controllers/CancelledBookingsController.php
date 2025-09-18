<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\cancelledBookings;
use Illuminate\Http\Request;

class CancelledBookingsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
         $validated = request()->validate([
            'booking_id' => 'required',
            'user_id' => 'required',
            'babysitter_id' => 'required',
            'payment_method' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ]);

        cancelledBookings::create($validated);

        $id = $request->input('booking_id');
        $booking = Booking::find($id);

        if($booking) {
            $booking->delete();
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
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
