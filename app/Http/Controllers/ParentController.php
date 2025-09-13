<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ParentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = DB::table('users')
            ->leftJoin('bookings', 'users.id', '=', 'bookings.babysitter_id')
            ->select(
                'users.*',
                'status',
                'user_id'
            )
            ->where('is_babysitter', 1)
            ->whereIn('status', ['pending', 'approved'])
            ->orderBy('id')
            ->get();

        $userSessionId = Auth::id();
        $usersBook = Booking::where('user_id', $userSessionId)
            ->whereIn('status', ['pending', 'approved'])
            ->count();



        return Inertia::render('Parents/Index', compact('users', 'usersBook'));
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
            'status' => 'required',
            'payment_method' => 'required',
            'start_date' => 'required',
            'end_date' => 'required',
        ]);

        Booking::create($validated);

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
