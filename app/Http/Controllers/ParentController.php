<?php

namespace App\Http\Controllers;

use App\Mail\Parent\BookingMail as ParentBookingMail;
use App\Mail\Babysitter\BookingMail as BabysitterBookingMail;
use App\Mail\Parent\CancelBookingMail as ParentCancelBookingMail;
use App\Mail\Babysitter\CancelBookingMail as BabysitterCancelBookingMail;
use App\Mail\Babysitter\BookingStatusMail;
use App\Models\Booking;
use App\Models\Notification;
use App\Models\Rating;
use App\Models\User;
use Carbon\Carbon;
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

        $userSessionId = Auth::id();

        foreach ($users as $u) {
            $u->rate = number_format($u->rate, 2);

            $rate = Rating::select('ratings')
                ->where('babysitter_id', $u->id)
                ->get();

            $total = 0;

            foreach ($rate as $r) {
                $total += $r->ratings;
            }

            $ratingCount = $rate->Count();

            if ($ratingCount) {
                if ($ratingCount === 0) {
                    $u->rateAverage = NULL;
                } else {
                    $u->rateAverage = $total / $ratingCount;
                }
            }


            $u->hireCount = Booking::where('babysitter_id', $u->id)
                ->whereIn('status', ['approved', 'done'])
                ->get()
                ->count();
        }

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
            ->send(new ParentBookingMail($bookings));

        $babysitter = User::where('id', $babysitterId)->first();
        Mail::to($babysitter->email)
            ->send(new BabysitterBookingMail($bookings));

        $babysitterName = User::where('id', $request->input('babysitter_id'))->value('name');

        Notification::create(
            [
                'user_id' => Auth::id(),
                'notification' => 'You successfully booked ' . $babysitterName . '.'
            ]
        );

        $start_date = Carbon::parse($request->input('start_date'));
        $end_date = Carbon::parse($request->input('end_date'));
        $durationDays = $start_date->diffInDays($end_date);
        
      

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
        $babysitterId = $request->input('babysitter_id');
        $status = $request->input('status');

        Booking::where('id', $booking_id)->update(['status' => $status]);
        User::where('id', $babysitterId)->update(['book_status' => NULL]);

        $user = Auth::user();
        Mail::to($user->email)
            ->send(new ParentCancelBookingMail($booking_id));

        $babysitter = User::where('id', $babysitterId)->first();
        Mail::to($babysitter->email)
            ->send(new BabysitterCancelBookingMail($booking_id));

            $parentId = Booking::where('id', $booking_id)->value('user_id');
            $parentName = User::where('id', $parentId)->value('name');

        Notification::create([
            'user_id' => $babysitterId,
            'notification' => $parentName . ' has cancelled the booking.',
        ]);
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

        $booking = Booking::where('id', $booking_id)->first();
        $parent = User::where('id', $booking->user_id)->first();
        Mail::to($parent->email)
            ->send(new BookingStatusMail($booking_id));

        $userId = Booking::where('id', $booking_id)->value('user_id');
        $babysitterNameNotification = User::where('id', $babysitter_id)->value('name');

        Notification::create([
            'user_id' => $userId,
            'notification' => $status === "done" ? 'Your booking with ' .  $babysitterNameNotification . ' has now ended' :
                $babysitterNameNotification . ' has ' . $status . ' your request.',
        ]);

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
