<?php

namespace App\Http\Controllers;

use App\Mail\Parent\BookingMail;
use App\Mail\Parent\CancelBookingMail;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ParentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::where('is_babysitter', 1)
            ->whereNot('rate', 0.00)
            ->orderBy('id')
            ->paginate(2);

        foreach ($users as $u) {
            $u->rate = number_format($u->rate, 2);
        }

        $userSessionId = Auth::id();

        return Inertia::render('Parents/Index', compact('users'));
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
        $validated = request()->validate([
            'user_id' => 'required',
            'babysitter_id' => 'required',
            'book_status' => 'required',
            'status' => 'required',
            'payment_method' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ]);

        $bookStatus = $request->input('book_status');
        $babysitterId = $request->input('babysitter_id');

        User::where('id', $babysitterId)->update(['book_status' => $bookStatus]);

        $bookings = Booking::create($validated);

        $user = Auth::user();
        Mail::to($user->email)
            ->send(new BookingMail($bookings));

        return redirect()->route('parent.index')->with('message', 'Booked Successfully!');
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
    public function update(Request $request)
    {
        $validated = request()->validate([
            'booking_id' => 'required',
            'babysitter_id' => 'required',
            'status' => 'required'
        ]);

        $booking_id = $request->input('booking_id');
        $babysitter_id = $request->input('babysitter_id');
        $status = $request->input('status');

        Booking::where('id', $booking_id)->update(['status' => $status]);
        User::where('id', $babysitter_id)->update(['book_status' => NULL]);

        $bookings = $validated;

        $user = Auth::user();
        Mail::to($user->email)
            ->send(new CancelBookingMail($booking_id));

        return redirect()->route('notification.index');
    }

    public function updateStatus(Request $request)
    {
        request()->validate([
            'booking_id' => 'required',
            'babysitter_id' => 'required',
            'status' => 'required'
        ]);

        $booking_id = $request->input('booking_id');
        $status = $request->input('status');
        $babysitter_id = $request->input('babysitter_id');

        Booking::where('id', $booking_id)->update(['status' => $status]);

        if ($status) {
            if ($status === "done" || "declined") {
                User::where('id', $babysitter_id)->update(['book_status' => NULL]);
            }
        }

        return redirect()->route('notification.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
