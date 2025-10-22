<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BookingHistoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Main/Notification');
    }

    public function bookJson()
    {
        $userId = Auth::id();

        $books = DB::table('bookings')
            ->latest()
            ->leftJoin('users', 'bookings.babysitter_id', '=', 'users.id')
            ->select(
                'bookings.*',
                'users.profile',
                'users.name',
                'users.rate',
                DB::raw('(SELECT ratings FROM ratings WHERE ratings.booking_id = bookings.id) as ratings')
            )
            ->where('user_id', $userId)
            ->get();

        foreach ($books as $b) {
            $start = Carbon::parse($b->start_date);
            $end = Carbon::parse($b->end_date);
            $b->date = $start->diffInDays($end);
        }

        return response()->json($books);
    }

    public function bookingJson()
    {
        $userId = Auth::id();

        $bookings = DB::table('bookings')
            ->latest()
            ->leftJoin('users', 'bookings.user_id', '=', 'users.id')
            ->select(
                'bookings.*',
                'users.profile',
                'users.name',
                DB::raw('(SELECT ratings FROM ratings WHERE ratings.booking_id = bookings.id) as ratings')
            )
            ->where('babysitter_id', $userId)
            ->get();

        foreach ($bookings as $b) {
            $start = Carbon::parse($b->start_date);
            $end = Carbon::parse($b->end_date);
            $b->date = $start->diffInDays($end);
        }

        return response()->json($bookings);
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
