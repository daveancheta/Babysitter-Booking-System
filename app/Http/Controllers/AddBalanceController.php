<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AddBalanceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('settings/addBalance');
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
    public function edit(User $parent)
    {
        return Inertia::render('settings/userFound', compact('parent'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        request()->validate([
            'account_id' => 'required',
            'balance' => 'required',
        ]);

        $accountID = $request->input('account_id');
        $balance = $request->input('balance');
        $currentBalance = User::where('account_id', $accountID)->first();

        User::where('account_id', $accountID)->update(['balance' => (int)$currentBalance->balance + $balance]); 


        return redirect()->route('balance.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
