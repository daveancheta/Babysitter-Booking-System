<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use App\Http\Requests\Settings\ProfileUpdateRequest;
use App\Models\Booking;
use App\Models\Follow;
use App\Models\Rating;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Inertia\Response;

use function Laravel\Prompts\select;

class ProfileController extends Controller
{
    /**
     * Show the user's profile settings page.
     */
    public function edit(Request $request): Response
    {
        $userId = Auth::id();
        $followingCount = Follow::where('follower_user_id', $userId)->count();
        $followerCount = Follow::where('following_user_id', $userId)->count();

        $followingUser = DB::table('follows')
            ->leftJoin('users', 'follows.following_user_id', '=', 'users.id')
            ->select(
                'follows.*',
                'users.name',
                'users.profile'
            )
            ->orderBy('created_at', 'desc')
            ->where('follower_user_id', $userId)
            ->get();

        $followerUser = DB::table('follows')
            ->leftJoin('users', 'follows.follower_user_id', '=', 'users.id')
            ->select(
                'follows.*',
                'users.name',
                'users.profile',
                'users.id as users_id'
            )
            ->selectRaw(
                '(SELECT COUNT(*) FROM follows WHERE follows.following_user_id = users_id AND follows.follower_user_id = ?) as ifFollows',
                [$userId]
            )
            ->orderBy('created_at', 'desc')
            ->where('following_user_id', $userId)
            ->get();

        $rate = Rating::select('ratings')
        ->where('id', $userId)
        ->get();

        $total = 0;
        $ratingCount = $rate->Count();
        foreach ($rate as $r) {
            $total += $r->ratings;
        }

        $rateAverage = $total / $ratingCount;

        $hireCount = Booking::where('babysitter_id', $userId)
        ->whereIn('status', ['approved', 'done'])
        ->get()
        ->count();

        return Inertia::render('settings/profile', compact('followingCount', 'followerCount', 'followingUser', 'followerUser', 'rateAverage', 'hireCount'), [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Update the user's profile settings.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return to_route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
