<?php

namespace App\Http\Controllers;

use App\Models\Banning;
use App\Models\Comment;
use App\Models\Follow;
use App\Models\Notification;
use App\Models\Post;
use App\Models\Reaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Response;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {

        Gate::authorize('admin-allowed');

        $currentMonth = Carbon::now()->format('m');
        $previousMonth = Carbon::now()->subMonth()->format('m');

        $current = DB::table('bookings')
            ->leftJoin('users', 'bookings.babysitter_id', '=', 'users.id')
            ->select(
                'bookings.*',
                'users.rate'
            )
            ->whereMonth('bookings.created_at', $currentMonth)
            ->whereIn('status', ['done', 'approved'])
            ->get();

        $past = DB::table('bookings')
            ->leftJoin('users', 'bookings.babysitter_id', '=', 'users.id')
            ->select(
                'bookings.*',
                'users.rate'
            )
            ->whereMonth('bookings.created_at', $previousMonth)
            ->whereIn('status', ['done', 'approved'])
            ->get();

        $currentSales = 0;
        $currentRevenue = 0;
        foreach ($current as $c) {
            $c->start_date = Carbon::parse($c->start_date);
            $c->end_date = Carbon::parse($c->end_date);
            $duration = $c->start_date->diffInDays($c->end_date);
            $currentSales += $c->rate * $duration;
            $currentRevenue = $currentSales * 0.10;
        }

        $pastSales = 0;
        $pastRevenue = 0;
        foreach ($past as $p) {
            $p->start_date = Carbon::parse($p->start_date);
            $p->end_date = Carbon::parse($p->end_date);
            $duration = $p->start_date->diffInDays($p->end_date);
            $pastSales += $p->rate * $duration;
            $pastRevenue = $pastSales * 0.10;
        }

        if ($pastRevenue > 0) {
            $revenuePercentage = (($currentRevenue - $pastRevenue) / $pastRevenue) * 100;
        } else {
            $revenuePercentage = 0.00;
        }

        $newParents = User::whereNot('is_admin', true)
            ->whereNot('is_babysitter', true)
            ->whereMonth('created_at',  $currentMonth)
            ->get()
            ->count();

        $previousParents = User::whereNot('is_admin', true)
            ->whereNot('is_babysitter', true)
            ->whereMonth('created_at',  $previousMonth)
            ->get()
            ->count();

        if ($previousParents > 0) {
            $parentPercentage = (($newParents - $previousParents) / $previousParents) * 100;
        } else {
            $parentPercentage = 100.00;
        }

        $newBabysitters = User::whereNot('is_admin', true)
            ->where('is_babysitter', true)
            ->whereMonth('created_at',  $currentMonth)
            ->get()
            ->count();

        $previousBabysitters = User::whereNot('is_admin', true)
            ->where('is_babysitter', true)
            ->whereMonth('created_at',  $previousMonth)
            ->get()
            ->count();

        if ($previousBabysitters > 0) {
            $babysitterPercentage = (($newBabysitters - $previousBabysitters) / $previousBabysitters) * 100;
        } else {
            $babysitterPercentage = 100.00;
        }

        $users = User::oldest()->whereNot('is_admin', true)
            ->get();

        foreach ($users as $u) {
            $u->formattedBalance = number_format($u->balance, 2);
        }

        return Inertia::render('dashboard', compact(
            'users',
            'currentRevenue',
            'pastRevenue',
            'revenuePercentage',
            'newParents',
            'previousParents',
            'parentPercentage',
            'newBabysitters',
            'previousBabysitters',
            'babysitterPercentage'
        ));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function ban($ip_address)
    {
        Banning::create([
            'ip_address' => $ip_address
        ]);

        return redirect()->route('dashboard');
    }

    /**
     * Display the specified resource.
     */
    public function downloadUsersTable()
    {
        $users = User::get();

        $csvFileName = 'users.csv';
        $path = public_path($csvFileName);

        $csvFile = fopen($path, 'w');
        $data = $users->toArray();

        $headers = array_keys($data[0]);
        fputcsv($csvFile, $headers);

        foreach ($data as $row) {
            fputcsv($csvFile, (array) $row);
        }

        fclose($csvFile);

        return response()->download($path)->deleteFileAfterSend(true);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $id)
    {
        $request->validate([
            'id' => 'nullable',
            'account_id' => 'nullable',
            'ip_address' => 'nullable',
            'name' => 'nullable',
            'email' => 'nullable',
            'address' => 'nullable',
            'contact_number' => 'nullable',
            'profile' => 'nullable',
            'balance' => 'nullable',
            'rate' => 'nullable',
            'book_status' => 'nullable',
        ]);

        $id->update([
            'account_id' => $request->account_id,
            'ip_address' => $request->ip_address,
            'name' => $request->name,
            'email' => $request->email,
            'address' => $request->address,
            'contact_number' => $request->contact_number,
            'profile' => $request->profile,
            'balance' => $request->balance,
            'rate' => $request->rate,
            'book_status' => $request->book_status === 'Booked' ? 'booked' : NULL,
        ]);

        return redirect()->route('dashboard')->with('message', 'Success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        User::where('id', $id)->delete();
        Post::where('babysitter_id', $id)->delete();
        Reaction::where('user_id', $id)->delete();
        Comment::where('user_id', $id)->delete();
        Follow::where('following_user_id', $id)->delete();
        Follow::where('follower_user_id', $id)->delete();
        Notification::where('user_id', $id)->delete();

        return redirect()->route('dashboard');
    }
}
